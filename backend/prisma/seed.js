import { PrismaClient, RoleName, VisitStatus, SlotType, SlotStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for Sugiyog...');

  // 1. Create System Roles
  const rolesData = [
    {
      name: RoleName.SUPER_ADMIN,
      displayName: 'Super Administrator',
      description: 'Unrestricted system-wide administration and audit authority',
    },
    {
      name: RoleName.ADMIN,
      displayName: 'Administrator',
      description: 'General system administration across all operational modules',
    },
    {
      name: RoleName.ASSISTANT,
      displayName: "Swami Ji's Executive Assistant",
      description: 'Manages Swami Ji travel itineraries, city visits, appointment slots, and bookings',
    },
    {
      name: RoleName.BOOKING_MANAGER,
      displayName: 'Booking Manager',
      description: 'Reviews, reschedules, and verifies client appointment bookings and requests',
    },
    {
      name: RoleName.FINANCE_MANAGER,
      displayName: 'Finance Manager',
      description: 'Oversees consultation payments, fee records, and financial reporting',
    },
    {
      name: RoleName.CONTENT_MANAGER,
      displayName: 'Content Manager',
      description: 'Manages website articles, testimonials, event announcements, and gallery',
    },
  ];

  const roleMap = {};
  for (const role of rolesData) {
    const upserted = await prisma.role.upsert({
      where: { name: role.name },
      update: { displayName: role.displayName, description: role.description },
      create: role,
    });
    roleMap[role.name] = upserted;
    console.log(`✓ Role ready: ${role.displayName}`);
  }

  // 2. Create Permissions
  const permissionsData = [
    { code: 'travel:read', module: 'TRAVEL', description: 'View travel schedules and city visits' },
    { code: 'travel:create', module: 'TRAVEL', description: 'Create new city visits' },
    { code: 'travel:update', module: 'TRAVEL', description: 'Modify and reschedule city visits' },
    { code: 'travel:publish', module: 'TRAVEL', description: 'Publish and toggle public visibility of visits' },
    { code: 'travel:delete', module: 'TRAVEL', description: 'Archive or cancel travel visits' },

    { code: 'slot:read', module: 'AVAILABILITY', description: 'View appointment slots' },
    { code: 'slot:create', module: 'AVAILABILITY', description: 'Create appointment availability slots' },
    { code: 'slot:update', module: 'AVAILABILITY', description: 'Modify capacity and block dates/slots' },

    { code: 'booking:read', module: 'BOOKING', description: 'View bookings and seeker details' },
    { code: 'booking:create', module: 'BOOKING', description: 'Book appointments on behalf of seekers' },
    { code: 'booking:update', module: 'BOOKING', description: 'Confirm, reschedule, or cancel bookings' },

    { code: 'finance:read', module: 'FINANCE', description: 'View payments, fees, and financial ledger' },
    { code: 'finance:update', module: 'FINANCE', description: 'Manage payment statuses and refunds' },

    { code: 'content:read', module: 'CONTENT', description: 'View services, events, testimonials, and media' },
    { code: 'content:write', module: 'CONTENT', description: 'Publish or edit content, events, and gallery' },

    { code: 'settings:manage', module: 'SETTINGS', description: 'Manage site settings and configuration' },
    { code: 'admin:manage', module: 'USERS', description: 'Manage admin user accounts and roles' },
    { code: 'audit:read', module: 'AUDIT', description: 'View administrative audit logs' },
  ];

  for (const perm of permissionsData) {
    const upserted = await prisma.permission.upsert({
      where: { code: perm.code },
      update: { description: perm.description, module: perm.module },
      create: perm,
    });

    // Link all to SUPER_ADMIN
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roleMap[RoleName.SUPER_ADMIN].id,
          permissionId: upserted.id,
        },
      },
      update: {},
      create: {
        roleId: roleMap[RoleName.SUPER_ADMIN].id,
        permissionId: upserted.id,
      },
    });

    // Link Assistant permissions
    if (['TRAVEL', 'AVAILABILITY', 'BOOKING', 'CONTENT'].includes(perm.module)) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roleMap[RoleName.ASSISTANT].id,
            permissionId: upserted.id,
          },
        },
        update: {},
        create: {
          roleId: roleMap[RoleName.ASSISTANT].id,
          permissionId: upserted.id,
        },
      });
    }
  }
  console.log('✓ System permissions initialized');

  // 3. Create Seed Admin Users (Safe development credentials)
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('SugiyogAdmin@2026', salt);
  const assistantPasswordHash = await bcrypt.hash('AssistantSugiyog@2026', salt);

  const superAdmin = await prisma.adminUser.upsert({
    where: { email: 'superadmin@sugiyog.org' },
    update: {
      passwordHash: adminPasswordHash,
      roleId: roleMap[RoleName.SUPER_ADMIN].id,
    },
    create: {
      fullName: 'Chief Administrator',
      email: 'superadmin@sugiyog.org',
      passwordHash: adminPasswordHash,
      phone: '+91 98765 43210',
      roleId: roleMap[RoleName.SUPER_ADMIN].id,
    },
  });
  console.log(`✓ Super Admin seeded: ${superAdmin.email}`);

  const assistant = await prisma.adminUser.upsert({
    where: { email: 'assistant@sugiyog.org' },
    update: {
      passwordHash: assistantPasswordHash,
      roleId: roleMap[RoleName.ASSISTANT].id,
    },
    create: {
      fullName: "Swami Ji's Personal Secretariat",
      email: 'assistant@sugiyog.org',
      passwordHash: assistantPasswordHash,
      phone: '+91 98765 43211',
      roleId: roleMap[RoleName.ASSISTANT].id,
    },
  });
  console.log(`✓ Assistant seeded: ${assistant.email}`);

  // 4. Create Standard Services (Swami Ji's 6 Core Consultation Offerings)
  await prisma.service.updateMany({
    data: { isActive: false },
  });

  const services = [
    {
      title: 'Online Nadi Reading',
      slug: 'online-nadi-reading',
      shortDescription: 'High-definition live video consultation connecting seekers globally with Swami Ji and sacred palm leaf wisdom.',
      description: 'Receive an authentic Nadi reading from anywhere in the world. After your thumb impression is indexed and candidate leaves are traced, join a secure, live interactive video session with Swami Ji and expert translators to uncover the sacred verses inscribed for your destiny.',
      durationMinutes: 45,
      price: 3500.00,
      currency: 'INR',
      isOnlineSupported: true,
      isInPersonSupported: false,
      isActive: true,
      displayOrder: 1,
    },
    {
      title: 'Palm Leaf Identification',
      slug: 'palm-leaf-identification',
      shortDescription: 'The sacred classification of thumb impressions and archive search to identify your soul’s inscribed palm leaf bundle.',
      description: 'Based on the 108 classical thumbprint classifications (Chakra, Shankha, etc.), the archive team meticulously searches ancient palm leaf bundles in sacred South Indian repositories to authenticate the exact manuscript inscribed for your life journey.',
      durationMinutes: 30,
      price: 2500.00,
      currency: 'INR',
      isOnlineSupported: true,
      isInPersonSupported: true,
      isActive: true,
      displayOrder: 2,
    },
    {
      title: 'Personalized Life Predictions',
      slug: 'personalized-life-predictions',
      shortDescription: 'Comprehensive chronological destiny reading covering vocation, family harmony, health tendencies, and life milestones.',
      description: 'An in-depth reading tracing your complete life trajectory as revealed by the Sapta Rishis. Unveil past karmic influences, present turning points, and future milestones, including career breakthroughs, relationship dynamics, financial prosperity, and spiritual evolution.',
      durationMinutes: 60,
      price: 4500.00,
      currency: 'INR',
      isOnlineSupported: true,
      isInPersonSupported: true,
      isActive: true,
      displayOrder: 3,
    },
    {
      title: 'Spiritual Remedies',
      slug: 'spiritual-remedies',
      shortDescription: 'Prescribed sacred rituals, temple visits, mantra japa, and ethical charity (Shanti & Pariharam) to resolve karmic debts.',
      description: 'Sage-inscribed recommendations to dissolve past-life karmic burdens and energetic blockages. Includes precise guidance on visiting specific temple energy vortexes, sacred chant vibrations (mantras), planetary peace rituals, and charitable acts (Daan & Seva).',
      durationMinutes: 45,
      price: 4000.00,
      currency: 'INR',
      isOnlineSupported: true,
      isInPersonSupported: true,
      isActive: true,
      displayOrder: 4,
    },
    {
      title: 'Reading for Specific Questions',
      slug: 'reading-for-specific-questions',
      shortDescription: 'Targeted consultation focusing on urgent dilemmas, career transitions, matrimonial decisions, or personal crises.',
      description: 'When facing critical crossroads in life, this focused reading directly addresses your specific concerns. Swami Ji consults the relevant palm leaf verses to provide clear, dharmic direction on career changes, legal disputes, partnership compatibility, health issues, or relocation.',
      durationMinutes: 40,
      price: 3500.00,
      currency: 'INR',
      isOnlineSupported: true,
      isInPersonSupported: true,
      isActive: true,
      displayOrder: 5,
    },
    {
      title: 'Nadi Jothidam Consultations',
      slug: 'nadi-jothidam-consultations',
      shortDescription: 'Profound synthesis of classical Vedic astrology (Jyotish) planetary transits with ancient Nadi palm leaf verses.',
      description: 'A traditional synthesis of Vedic astrological calculations and sacred palm leaf wisdom. Explores current planetary dasha cycles, transits (Gochara), and astrological alignments to illuminate optimal timings for auspicious milestones and personal remedies.',
      durationMinutes: 60,
      price: 5000.00,
      currency: 'INR',
      isOnlineSupported: true,
      isInPersonSupported: true,
      isActive: true,
      displayOrder: 6,
    },
  ];

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
  }
  console.log(`✓ ${services.length} Consultation Services seeded`);

  // 5. Create Sample Travel Visit (Published)
  const now = new Date();
  const startDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const endDate = new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000);

  const visit = await prisma.travelVisit.create({
    data: {
      title: "Swami Ji's Spiritual Darshan & Nadi Shastra Consultation Tour - New Delhi",
      country: 'India',
      city: 'New Delhi',
      venueName: 'Vedic Heritage Centre, Chanakyapuri',
      venueAddress: 'Chanakyapuri Cultural Enclave, New Delhi, 110021',
      venueMapsUrl: 'https://maps.google.com/?q=New+Delhi',
      isVenuePrivate: false,
      startDate: startDate,
      endDate: endDate,
      timezone: 'Asia/Kolkata',
      status: VisitStatus.PUBLISHED,
      isPublic: true,
      isBookingOpen: true,
      maxCapacity: 40,
      notes: 'Please bring your right/left thumb impression print and birth details if available.',
    },
  });
  console.log(`✓ Published Travel Visit created: ${visit.city} (${visit.title})`);

  // 6. Create Availability Slots for this Visit
  const slotDate = new Date(startDate);
  const slotStartTime = new Date(slotDate);
  slotStartTime.setHours(10, 0, 0, 0);
  const slotEndTime = new Date(slotDate);
  slotEndTime.setHours(11, 0, 0, 0);

  await prisma.availabilitySlot.create({
    data: {
      slotType: SlotType.IN_PERSON,
      travelVisitId: visit.id,
      date: slotDate,
      startTime: slotStartTime,
      endTime: slotEndTime,
      timezone: 'Asia/Kolkata',
      capacity: 1,
      bookedCount: 0,
      status: SlotStatus.AVAILABLE,
      isBlocked: false,
      notes: 'Morning in-person consultation session',
    },
  });

  // Also create an online availability slot independent of city visit
  const onlineDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const onlineStart = new Date(onlineDate);
  onlineStart.setHours(15, 0, 0, 0);
  const onlineEnd = new Date(onlineDate);
  onlineEnd.setHours(16, 0, 0, 0);

  await prisma.availabilitySlot.create({
    data: {
      slotType: SlotType.ONLINE,
      travelVisitId: null,
      date: onlineDate,
      startTime: onlineStart,
      endTime: onlineEnd,
      timezone: 'Asia/Kolkata',
      capacity: 1,
      bookedCount: 0,
      status: SlotStatus.AVAILABLE,
      isBlocked: false,
      notes: 'Global Video Consultation Session',
    },
  });
  console.log('✓ Appointment Availability Slots initialized');

  // 7. Site Settings
  const settings = [
    {
      key: 'site_metadata',
      category: 'general',
      description: 'Platform name, tagline and official contact info',
      value: JSON.stringify({
        siteName: 'Sugiyog',
        tagline: 'Ancient Nadi Shastra Wisdom for Modern Life Direction',
        contactEmail: 'contact@sugiyog.org',
        contactPhone: '+91 11 2345 6789',
        supportWhatsapp: '+91 98765 43210',
        officeAddress: 'Sugiyog Ashram & Research Centre, Haridwar / New Delhi, India',
      }),
    },
    {
      key: 'booking_policy',
      category: 'policy',
      description: 'Terms regarding booking confirmations and rescheduling',
      value: JSON.stringify({
        cancellationNoticeHours: 48,
        refundPermitted: true,
        reschedulingAllowance: 2,
        thumbImpressionRequired: true,
      }),
    },
  ];

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log('✓ Site settings seeded successfully');

  console.log('\n🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
