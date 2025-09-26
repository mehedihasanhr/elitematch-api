/*
  Warnings:

  - You are about to drop the `refered_dates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refered_dates` DROP FOREIGN KEY `refered_dates_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `refered_dates` DROP FOREIGN KEY `refered_dates_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `refered_dates` DROP FOREIGN KEY `refered_dates_updated_by_fkey`;

-- DropTable
DROP TABLE `refered_dates`;

-- CreateTable
CREATE TABLE `prefered_dates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `profileId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prefered_dates` ADD CONSTRAINT `prefered_dates_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prefered_dates` ADD CONSTRAINT `prefered_dates_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prefered_dates` ADD CONSTRAINT `prefered_dates_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
