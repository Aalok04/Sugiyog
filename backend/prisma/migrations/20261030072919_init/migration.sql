-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `countryCode` VARCHAR(10) NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `timezone` VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    `dateOfBirth` DATETIME(3) NULL,
    `timeOfBirth` VARCHAR(20) NULL,
    `placeOfBirth` VARCHAR(150) NULL,
    `gender` VARCHAR(20) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminUser` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLoginAt` DATETIME(3) NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `AdminUser_email_key`(`email`),
    INDEX `AdminUser_roleId_idx`(`roleId`),
    INDEX `AdminUser_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('SUPER_ADMIN', 'ADMIN', 'ASSISTANT', 'BOOKING_MANAGER', 'FINANCE_MANAGER', 'CONTENT_MANAGER') NOT NULL,
    `displayName` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `module` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Permission_code_key`(`code`),
    INDEX `Permission_module_idx`(`module`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermission` (
    `id` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RolePermission_roleId_idx`(`roleId`),
    INDEX `RolePermission_permissionId_idx`(`permissionId`),
    UNIQUE INDEX `RolePermission_roleId_permissionId_key`(`roleId`, `permissionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `shortDescription` VARCHAR(500) NULL,
    `description` TEXT NULL,
    `durationMinutes` INTEGER NOT NULL DEFAULT 45,
    `price` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `isOnlineSupported` BOOLEAN NOT NULL DEFAULT true,
    `isInPersonSupported` BOOLEAN NOT NULL DEFAULT true,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `imageUrl` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Service_slug_key`(`slug`),
    INDEX `Service_slug_idx`(`slug`),
    INDEX `Service_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelVisit` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `venueName` VARCHAR(255) NULL,
    `venueAddress` TEXT NULL,
    `venueMapsUrl` VARCHAR(500) NULL,
    `isVenuePrivate` BOOLEAN NOT NULL DEFAULT false,
    `privateVenueDetails` TEXT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `timezone` VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    `status` ENUM('DRAFT', 'PUBLISHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `isBookingOpen` BOOLEAN NOT NULL DEFAULT false,
    `maxCapacity` INTEGER NOT NULL DEFAULT 0,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `TravelVisit_country_city_idx`(`country`, `city`),
    INDEX `TravelVisit_status_isPublic_idx`(`status`, `isPublic`),
    INDEX `TravelVisit_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AvailabilitySlot` (
    `id` VARCHAR(191) NOT NULL,
    `slotType` ENUM('ONLINE', 'IN_PERSON') NOT NULL DEFAULT 'ONLINE',
    `travelVisitId` VARCHAR(191) NULL,
    `date` DATE NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `timezone` VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    `capacity` INTEGER NOT NULL DEFAULT 1,
    `bookedCount` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('AVAILABLE', 'BOOKED', 'BLOCKED', 'RESERVED') NOT NULL DEFAULT 'AVAILABLE',
    `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    `notes` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AvailabilitySlot_travelVisitId_idx`(`travelVisitId`),
    INDEX `AvailabilitySlot_date_slotType_status_idx`(`date`, `slotType`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `bookingNumber` VARCHAR(50) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `travelVisitId` VARCHAR(191) NULL,
    `availabilitySlotId` VARCHAR(191) NULL,
    `bookingType` ENUM('INSTANT', 'REQUEST_BASED') NOT NULL DEFAULT 'INSTANT',
    `consultationFormat` ENUM('ONLINE', 'IN_PERSON') NOT NULL DEFAULT 'ONLINE',
    `status` ENUM('PENDING', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `scheduledDate` DATE NULL,
    `scheduledStartTime` DATETIME(3) NULL,
    `scheduledEndTime` DATETIME(3) NULL,
    `timezone` VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    `preferredDates` TEXT NULL,
    `clientNotes` TEXT NULL,
    `internalAdminNotes` TEXT NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `paymentStatus` ENUM('UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'UNPAID',
    `meetingLink` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Booking_bookingNumber_key`(`bookingNumber`),
    INDEX `Booking_userId_idx`(`userId`),
    INDEX `Booking_serviceId_idx`(`serviceId`),
    INDEX `Booking_travelVisitId_idx`(`travelVisitId`),
    INDEX `Booking_availabilitySlotId_idx`(`availabilitySlotId`),
    INDEX `Booking_bookingNumber_idx`(`bookingNumber`),
    INDEX `Booking_status_paymentStatus_idx`(`status`, `paymentStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `paymentReference` VARCHAR(100) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `paymentMethod` ENUM('ONLINE_GATEWAY', 'BANK_TRANSFER', 'CASH', 'UPI', 'CARD', 'CHEQUE', 'OTHER') NOT NULL DEFAULT 'ONLINE_GATEWAY',
    `status` ENUM('UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `gatewayTransactionId` VARCHAR(255) NULL,
    `gatewayName` VARCHAR(100) NULL,
    `receiptUrl` VARCHAR(500) NULL,
    `paidAt` DATETIME(3) NULL,
    `refundedAt` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_paymentReference_key`(`paymentReference`),
    INDEX `Payment_bookingId_idx`(`bookingId`),
    INDEX `Payment_paymentReference_idx`(`paymentReference`),
    INDEX `Payment_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `clientName` VARCHAR(150) NOT NULL,
    `clientLocation` VARCHAR(150) NULL,
    `quote` TEXT NOT NULL,
    `fullStory` TEXT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `consultationType` VARCHAR(100) NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `avatarUrl` VARCHAR(500) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Testimonial_isApproved_isFeatured_idx`(`isApproved`, `isFeatured`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `location` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `registrationLink` VARCHAR(500) NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `imageUrl` VARCHAR(500) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Event_slug_key`(`slug`),
    INDEX `Event_isPublished_eventDate_idx`(`isPublished`, `eventDate`),
    INDEX `Event_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(255) NOT NULL,
    `fileUrl` VARCHAR(500) NOT NULL,
    `mimeType` VARCHAR(100) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `altText` VARCHAR(255) NULL,
    `caption` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gallery` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'General',
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `mediaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Gallery_category_isPublished_idx`(`category`, `isPublished`),
    INDEX `Gallery_mediaId_idx`(`mediaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquiry` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `adminNotes` TEXT NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Inquiry_userId_idx`(`userId`),
    INDEX `Inquiry_status_idx`(`status`),
    INDEX `Inquiry_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `value` TEXT NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'general',
    `description` VARCHAR(255) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SiteSettings_key_key`(`key`),
    INDEX `SiteSettings_key_idx`(`key`),
    INDEX `SiteSettings_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `adminUserId` VARCHAR(191) NULL,
    `action` VARCHAR(100) NOT NULL,
    `entityType` VARCHAR(100) NOT NULL,
    `entityId` VARCHAR(100) NULL,
    `details` TEXT NULL,
    `ipAddress` VARCHAR(45) NULL,
    `userAgent` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_adminUserId_idx`(`adminUserId`),
    INDEX `AuditLog_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `AuditLog_action_idx`(`action`),
    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminUser` ADD CONSTRAINT `AdminUser_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AvailabilitySlot` ADD CONSTRAINT `AvailabilitySlot_travelVisitId_fkey` FOREIGN KEY (`travelVisitId`) REFERENCES `TravelVisit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_travelVisitId_fkey` FOREIGN KEY (`travelVisitId`) REFERENCES `TravelVisit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_availabilitySlotId_fkey` FOREIGN KEY (`availabilitySlotId`) REFERENCES `AvailabilitySlot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquiry` ADD CONSTRAINT `Inquiry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
