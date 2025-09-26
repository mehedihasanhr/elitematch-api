/*
  Warnings:

  - You are about to drop the column `range` on the `income_ranges` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `relationship_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `relocations` table. All the data in the column will be lost.
  - Added the required column `name` to the `income_ranges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `relationship_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `relocations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `income_ranges` DROP COLUMN `range`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `relationship_statuses` DROP COLUMN `status`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `relocations` DROP COLUMN `location`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `love-languages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `profileId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refered_dates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `profileId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reasons_for_using` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `profileId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cultural_fits` (
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
ALTER TABLE `love-languages` ADD CONSTRAINT `love-languages_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `love-languages` ADD CONSTRAINT `love-languages_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `love-languages` ADD CONSTRAINT `love-languages_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refered_dates` ADD CONSTRAINT `refered_dates_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refered_dates` ADD CONSTRAINT `refered_dates_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refered_dates` ADD CONSTRAINT `refered_dates_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reasons_for_using` ADD CONSTRAINT `reasons_for_using_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reasons_for_using` ADD CONSTRAINT `reasons_for_using_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reasons_for_using` ADD CONSTRAINT `reasons_for_using_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_fits` ADD CONSTRAINT `cultural_fits_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_fits` ADD CONSTRAINT `cultural_fits_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_fits` ADD CONSTRAINT `cultural_fits_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
