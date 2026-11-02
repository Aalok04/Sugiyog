import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Fingerprint,
  Search,
  MessageCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Video,
  HeartHandshake,
  FileText,
} from 'lucide-react';
import api from '../../services/api';
import ServiceCard from '../../components/cards/ServiceCard';
import VisitCard from '../../components/cards/VisitCard';
import ConsultationFormatCard from '../../components/cards/ConsultationFormatCard';
import GlobalTravelMap from '../../components/map/GlobalTravelMap';
import TestimonialCarousel from '../../components/testimonials/TestimonialCarousel';
import GoldParticles from '../../components/animations/GoldParticles';
import MandalaOrnament from '../../components/animations/MandalaOrnament';
import SanatanDhwajaCanvas from '../../components/animations/SanatanDhwajaCanvas';
import { FALLBACK_SERVICES, FALLBACK_VISITS, FALLBACK_TESTIMONIALS } from '../../services/fallbackData';

export default function Home() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [visits, setVisits] = useState(FALLBACK_VISITS);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllKandams, setShowAllKandams] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/services').catch(() => ({ data: [] })),
      api.get('/travel-visits').catch(() => ({ data: [] })),
      api.get('/testimonials').catch(() => ({ data: [] })),
    ])
      .then(([servicesRes, visitsRes, testRes]) => {
        if (servicesRes.success && servicesRes.data?.length) setServices(servicesRes.data);
        if (visitsRes.success && visitsRes.data?.length) setVisits(visitsRes.data);
        if (testRes.success && testRes.data?.length) setTestimonials(testRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const kandamsList = [
    { number: '1', title: 'General Kandam', desc: 'Identifies basic horoscope, parents’ names, and comprehensive overview of all 12 life houses.' },
    { number: '2', title: 'Wealth, Speech & Family', desc: 'Financial prosperity, family harmony, educational pursuits, and speech attributes.' },
    { number: '3', title: 'Siblings & Courage', desc: 'Relationships with brothers and sisters, determination, and communication faculties.' },
    { number: '4', title: 'Mother, Land & Vehicles', desc: 'Maternal health, ancestral properties, real estate acquisition, and household comforts.' },
    { number: '5', title: 'Children & Progeny', desc: 'Birth of children, family lineage blessings, and prosperity of future generations.' },
    { number: '6', title: 'Health, Debts & Enemies', desc: 'Diagnosis of physical ailments, clearance of financial debts, and resolution of litigation.' },
    { number: '7', title: 'Matrimony & Destined Partner', desc: 'Auspicious marriage timings, characteristics and planetary harmony of the destined spouse.' },
    { number: '8', title: 'Longevity & Vitality', desc: 'Life span calculations, overcoming severe accidents, and safeguarding vital energies.' },
    { number: '9', title: 'Father & Spiritual Fortune', desc: 'Paternal lineage karma, pilgrim temple journeys, and guidance from enlightened gurus.' },
    { number: '10', title: 'Career & Business Enterprise', desc: 'Livelihood, vocational breakthroughs, enterprise ventures, and social repute.' },
    { number: '11', title: 'Profits & Secondary Gains', desc: 'Windfall opportunities, business alliances, secondary gains, and material fulfillment.' },
    { number: '12', title: 'Expenditure & Foreign Land', desc: 'Financial outlays, foreign settlements, spiritual detachment, and next incarnation.' },
    { number: '13', title: 'Shanti Kandam (Remedies)', desc: 'Sacred temple visits, charitable deeds (Daan), and rituals to dissolve past-life karmas.' },
    { number: '14', title: 'Deeksha Kandam (Diksha)', desc: 'Sacred mantra initiation, talisman energization, and spiritual protection against negative eyes.' },
    { number: '15', title: 'Aushadha Kandam', desc: 'Traditional Ayurvedic and Siddha herbal remedial prescriptions for chronic health troubles.' },
    { number: '16', title: 'Dasa Bhukti Kandam', desc: 'Planetary periods, transit timing, and celestial alignments mapped to your destiny.' },
  ];

  const faqs = [
    {
      q: 'Why is only a thumb impression required instead of a birth chart?',
      a: 'In ancient Nadi Shastra, Sage Agasthiyar categorized all human destinies based on 108 classical thumbprint whorl patterns (such as Shankha, Chakra, Mandala). Your thumb impression (Right for Men, Left for Women) acts as the sacred index key to locate the specific palm leaf bundle containing your soul’s recorded destiny.',
    },
    {
      q: 'What occurs during the palm leaf verification procedure?',
      a: 'Once candidate leaf bundles are retrieved from the archives, Swami Ji or certified readers recite specific factual statements inscribed on each leaf (e.g., your parents’ names, sibling count, marital status). You simply respond with a clear "Yes" or "No". No information is disclosed by you upfront. When every statement matches your exact life, your destined leaf is identified.',
    },
    {
      q: 'Can online consultations be conducted worldwide with full authenticity?',
      a: 'Yes. The palm leaf inscriptions were recorded millennia ago and exist independently of physical location. During an Online Video Darshan, Swami Ji reads directly from your authenticated palm leaf over a private high-definition video session, with line-by-line translation in your preferred language.',
    },
    {
      q: 'Are the prescribed remedies (Pariharam) mandatory?',
      a: 'Remedies are benevolent spiritual recommendations inscribed by Sage Agasthiyar to dissolve past-life karmic burdens. They typically involve visiting specific high-energy temples in India, performing humble charity (Anna Daan / Cow Seva), or chanting sacred Vedic mantras. You are never forced; remedies are intended to bring peace and relief.',
    },
    {
      q: 'In which languages can consultations be conducted?',
      a: 'Consultations are conducted with expert translators in English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), and Gujarati (ગુજરાતી), ensuring complete clarity and reverence.',
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="home-page-container">
      {/* 1. Cinematic Full-Screen Hero Section */}
      <section className="hero-cinematic">
        {/* Animated Gold Floating Particles Canvas */}
        <GoldParticles count={38} />

        {/* 3D Waving Sanatan Dhwaja Flag (Behind Sacred Text) */}
        <SanatanDhwajaCanvas opacity={0.86} windSpeed={1.4} placement="behind-text" />

        {/* Subtle Sacred Rotating Mandala Ornament in Background */}
        <div className="hero-mandala-bg">
          <MandalaOrnament size={560} opacity={0.14} rotate={true} />
        </div>

        <div className="hero-container">
          <div className="hero-layout-grid">
            <div className="hero-text-content">
              <h1 className="hero-headline">
                Ancient Wisdom. <span className="gold-accent">Timeless Guidance.</span>
              </h1>

              <p className="hero-supporting-text">
                Discover the ancient tradition of Nadi Shastra through personal consultations with Swami Ji.
                Inscribed upon preserved palm leaves (Olai Chuvadi) by Sage Agasthiyar, uncovering your soul’s karmic blueprint,
                destiny milestones, and sacred remedies.
              </p>

              <div className="hero-cta-cluster">
                <Link to="/book" className="btn btn-luxury btn-lg">
                  <Calendar size={18} />
                  <span>Book a Consultation</span>
                </Link>
                <a href="#nadi-story" className="btn btn-outline-gold btn-lg">
                  <BookOpen size={18} />
                  <span>Discover Nadi Shastra</span>
                </a>
              </div>

              <div className="hero-pillars-row">
                <div className="hero-pillar-item">
                  <span className="pillar-number">108</span>
                  <span className="pillar-label">Thumbprint Classifications</span>
                </div>
                <div className="hero-pillar-item">
                  <span className="pillar-number">16</span>
                  <span className="pillar-label">Sacred Life Kandams</span>
                </div>
                <div className="hero-pillar-item">
                  <span className="pillar-number">Global</span>
                  <span className="pillar-label">Online & City Visits</span>
                </div>
              </div>
            </div>

            {/* Visual Portrait Frame with Gold Filigree */}
            <div className="hero-portrait-container">
              <div className="hero-portrait-gold-frame">
                <div className="portrait-inner-card">
                  <img
                    src="/images/swamiji.jpg"
                    alt="Pujya Swami Ji - Revered Vedic Seer and Nadi Shastra Custodian"
                    className="portrait-photo"
                  />
                  <div className="portrait-caption-glass">
                    <h4 className="caption-title">Pujya Swami Ji</h4>
                    <p className="caption-lineage">Swami jii  is a spiritual guru  and a healer </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Nadi Shastra Introduction & Storytelling */}
      <section id="nadi-story" className="story-section">
        <div className="container">
          <div className="story-editorial-centered">
            <h2 className="section-title">Inscribed by Ancient Rishis for Destined Seekers</h2>
            <p className="story-lead-desc">
              Millennia ago, enlightened sages led by <strong>Maharishi Agasthiyar</strong> inscribed individual soul destinies onto preserved palm leaves (Olai Chuvadi) in South India—awaiting the appointed hour when each destined seeker arrives to uncover their karmic blueprint.
            </p>

            <div style={{ marginTop: 'var(--space-4)' }}>
              <Link to="/nadi-shastra" className="btn btn-outline">
                <span>Explore Nadi Shastra History</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* 4-Step Process Section */}
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <h2 className="section-title">How Your Reading Unfolds</h2>
          </div>

          <div className="process-steps-grid">
            <div className="process-step-card">
              <div className="step-number-badge">1</div>
              <div className="step-card-icon">
                <Fingerprint size={28} />
              </div>
              <h3 className="step-title">Submit Thumbprint</h3>
              <p className="step-desc">
                Provide your thumb impression (Right for Men, Left for Women) securely online or via WhatsApp.
              </p>
            </div>

            <div className="process-step-card">
              <div className="step-number-badge">2</div>
              <div className="step-card-icon" style={{ color: 'var(--color-secondary-dark)' }}>
                <Search size={28} />
              </div>
              <h3 className="step-title">Archive Leaf Search</h3>
              <p className="step-desc">
                Archivists in Vaitheeswaran Koil locate candidate leaf bundles across 108 classical classifications.
              </p>
            </div>

            <div className="process-step-card">
              <div className="step-number-badge">3</div>
              <div className="step-card-icon">
                <CheckCircle size={28} />
              </div>
              <h3 className="step-title">Leaf Verification</h3>
              <p className="step-desc">
                Swami Ji recites verifying index verses—you only answer "Yes" or "No" until your exact leaf matches.
              </p>
            </div>

            <div className="process-step-card">
              <div className="step-number-badge">4</div>
              <div className="step-card-icon" style={{ color: 'var(--color-secondary-dark)' }}>
                <Sparkles size={28} />
              </div>
              <h3 className="step-title">Destiny Reading</h3>
              <p className="step-desc">
                Join a live, personal consultation unlocking your life predictions and sacred Pariharam remedies with translation.
              </p>
            </div>
          </div>

          {/* 16 Sacred Kandams Accordion / Grid */}
          <div style={{ marginTop: 'var(--space-16)' }}>
            <div className="section-header" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
              <h2 className="section-title">The 16 Sacred Kandams (Life Chapters)</h2>
              <p className="section-subtitle">
                Each palm leaf manuscript contains specific chapters addressing distinct dimensions of human karma and earthly existence.
              </p>
            </div>

            <div className="kandams-grid">
              {(showAllKandams ? kandamsList : kandamsList.slice(0, 4)).map((k) => (
                <div key={k.number} className="kandam-card">
                  <span className="kandam-tag">Kandam {k.number}</span>
                  <h3 className="kandam-title">{k.title}</h3>
                  <p className="kandam-desc">{k.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowAllKandams(!showAllKandams)}
                className="btn btn-outline"
              >
                <span>{showAllKandams ? 'Show Fewer Chapters' : `View All 16 Sacred Kandams (${kandamsList.length - 4} More)`}</span>
                {showAllKandams ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <Link to="/nadi-shastra" className="btn btn-primary">
                <span>Comprehensive Kandam Guide</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Meet Swami Ji Profile Section */}
      <section className="profile-section">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-portrait-wrap">
              <div className="profile-gold-border">
                <img
                  src="/images/swamiji.jpg"
                  alt="Pujya Swami Ji - Spiritual Master and Nadi Shastra Guardian"
                  className="profile-img"
                />
              </div>
            </div>

            <div className="profile-content">
              <h2>Pujya Swami Ji</h2>
              <p className="lead-text" style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                A lifelong ascetic and dedicated custodian of the Vaitheeswaran Koil Nadi tradition, Swami Ji has guided seekers worldwide for over 25 years.
              </p>
              <p style={{ lineHeight: 1.7, marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
                Interpreting ancient poetic verses with compassionate spiritual discernment, Swami Ji reveals your soul's karmic blueprint and prescribes sacred Vedic remedies (Pariharam) to dissolve life obstacles.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-primary btn-lg">
                  <span>Learn About Swami Ji’s Lineage</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/book" className="btn btn-secondary btn-lg">
                  <Calendar size={16} />
                  <span>Request Private Darshan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Consultation Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <h2 className="section-title">Sacred Formats Tailored to Every Seeker</h2>
            <p className="section-subtitle">
              Whether connecting via live high-definition video from across the world or meeting Swami Ji during his
              international city visits, experience the transformative clarity of Nadi Shastra.
            </p>
          </div>

          {/* 3 Core Consultation Format Cards */}
          <div className="format-cards-grid">
            <ConsultationFormatCard
              formatType="ONLINE"
              title="Online Video Consultation"
              tagline="Global Seekers"
              description="Live 1-on-1 reading via HD video with multi-lingual scholars and dedicated translation."
              benefits={[
                'HD video session & lifetime audio recording',
                'Multi-lingual live translation assistance',
                'Personalized Shanti Pariharam remedies',
              ]}
              duration="45-60 Mins"
              bookingLink="/book?format=ONLINE"
              popular={true}
            />

            <ConsultationFormatCard
              formatType="IN_PERSON"
              title="In-Person City Tour"
              tagline="Direct Darshan"
              description="Direct presence and personal blessings during Swami Ji’s scheduled national and global tours."
              benefits={[
                'Direct darshan & personal blessings',
                'Physical verification of original palm leaves',
                'Family members welcome to attend',
              ]}
              duration="60 Mins"
              bookingLink="/upcoming-visits"
              popular={false}
            />

            <ConsultationFormatCard
              formatType="INTERNATIONAL"
              title="International Private Reading"
              tagline="Deep Life Kandam"
              description="Multi-chapter comprehensive reading covering life destiny, family lineage, and sanctified remedies."
              benefits={[
                'Full General Kandam + 3 life chapters',
                'Lineage karma & compatibility analysis',
                'Priority scheduling & blessed yantra initiation',
              ]}
              duration="90 Mins"
              bookingLink="/book?format=INTERNATIONAL"
              popular={false}
            />
          </div>

          {/* 6 Specialized Offerings from Backend */}
          <div style={{ marginTop: 'var(--space-16)' }}>
            <div className="section-header" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
              <h2 className="section-title">Core Services Offered by Swami Ji</h2>
            </div>

            <div className="services-grid">
              {(showAllServices ? services : services.slice(0, 4)).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-10)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              {services.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="btn btn-outline btn-lg"
                >
                  <span>{showAllServices ? 'Show Fewer Services' : `Explore More Services (${services.length - 4} More)`}</span>
                  {showAllServices ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              )}
              <Link to="/book" className="btn btn-primary btn-lg">
                <span>Book Your Consultation Slot</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Global Travel Map */}
      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <h2 className="section-title">Interactive World Travel Map</h2>
            <p className="section-subtitle">
              Pujya Swami Ji regularly journeys across major international and domestic cities to grant in-person
              Nadi Shastra consultations and spiritual blessings. Click any golden marker to inspect tour dates and reserve appointments.
            </p>
          </div>

          <GlobalTravelMap visits={visits} loading={loading} />
        </div>
      </section>

      {/* 7. Upcoming International Visits Itinerary */}
      <section className="section section-surface">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Confirmed City Visits</h2>
            <p className="section-subtitle">
              Secure your appointment slot for upcoming in-person tours. Slots are strictly limited to ensure adequate time for every seeker.
            </p>
          </div>

          {visits.length > 0 ? (
            <div className="visits-list-grid">
              {visits.slice(0, 3).map((visit) => (
                <VisitCard key={visit.id} visit={visit} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-10)', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                New tour destinations are being scheduled by the secretariat for the upcoming quarter.
              </p>
              <Link to="/contact" className="btn btn-secondary">
                Request Swami Ji Visit to Your City
              </Link>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/upcoming-visits" className="btn btn-secondary btn-lg">
              <span>View Full Worldwide Tour Calendar</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Testimonials and Video Experiences */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto var(--space-8) auto' }}>
            <h2 className="section-title">Reflections of Gratitude & Truth</h2>
            <p className="section-subtitle">
              Authentic words from seekers whose personal, familial, and vocational questions found serene resolution
              through Swami Ji's Nadi Shastra readings.
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/testimonials" className="btn btn-outline">
              <span>Read More Seeker Stories & Reflections</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Events & Sacred Gallery Preview */}
      <section className="events-gallery-section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <h2 className="section-title">Events & Temple Gallery</h2>
              <p className="section-subtitle" style={{ maxWidth: 580, marginBottom: 0 }}>
                A glimpse into ancient palm leaf repositories, Vedic satsangs, and temple ceremonies conducted under Swami Ji’s guidance.
              </p>
            </div>
            <div>
              <Link to="/gallery" className="btn btn-outline">
                <span>View Full Gallery</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="gallery-preview-grid">
            <Link to="/gallery" className="gallery-preview-item">
              <img src="/images/gallery-swamiji-singhasan.jpg" alt="Pujya Swami Ji in Sacred Darshan" className="gallery-item-img" />
              <div className="gallery-item-caption">
                <h4 className="gallery-item-title">Pujya Swami Ji in Sacred Darshan</h4>
              </div>
            </Link>

            <Link to="/gallery" className="gallery-preview-item">
              <img src="/images/gallery-devotee-blessing.jpg" alt="Seeker Darshan & Divine Blessings" className="gallery-item-img" />
              <div className="gallery-item-caption">
                <h4 className="gallery-item-title">Seeker Darshan & Divine Blessings</h4>
              </div>
            </Link>

            <Link to="/gallery" className="gallery-preview-item">
              <img src="/images/gallery-darshan-sadhus.jpg" alt="Spiritual Satsang & Sanyasis Assembly" className="gallery-item-img" />
              <div className="gallery-item-caption">
                <h4 className="gallery-item-title">Spiritual Satsang & Sanyasis Assembly</h4>
              </div>
            </Link>

            <Link to="/gallery" className="gallery-preview-item">
              <img src="/images/gallery-sacred-procession.jpg" alt="Maha Kumbh Sacred Shobha Yatra" className="gallery-item-img" />
              <div className="gallery-item-caption">
                <h4 className="gallery-item-title">Maha Kumbh Sacred Shobha Yatra</h4>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Interactive FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about the palm leaf identification process, consultation formats, and remedies.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--color-secondary)" /> : <ChevronDown size={20} color="var(--color-secondary)" />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/faq" className="btn btn-outline">
              <span>View All Frequently Asked Questions</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Premium Booking CTA */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-box">
            <div className="gold-flourish" style={{ marginBottom: 'var(--space-4)' }}>
              <span className="gold-flourish-symbol">✦ ॐ ✦</span>
            </div>
            <h2>Begin Your Sacred Journey with Swami Ji</h2>
            <p>
              Your palm leaf was inscribed millennia ago, waiting for the celestial hour when you seek its truth.
              Reserve your personal online consultation or in-person city darshan appointment today.
            </p>
            <div className="cta-banner-actions">
              <Link to="/book" className="btn btn-secondary btn-lg">
                <Calendar size={18} />
                <span>Book a Consultation Now</span>
              </Link>
              <a
                href="https://wa.me/919876543210?text=Namaste%20Swami%20Ji%2C%20I%20would%20like%20to%20consult%20regarding%20Nadi%20Shastra."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-luxury btn-lg"
              >
                <MessageCircle size={18} />
                <span>Instant WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
