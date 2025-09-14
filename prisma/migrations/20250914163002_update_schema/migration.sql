/*
  Warnings:

  - You are about to drop the column `permissioin` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `educationLevel` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `income_range` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `relationship_status` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `relocations` table. All the data in the column will be lost.
  - Added the required column `permission` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `relocations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `permissioin`,
    ADD COLUMN `permission` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `educationLevel`,
    DROP COLUMN `income_range`,
    DROP COLUMN `occupation`,
    DROP COLUMN `relationship_status`,
    ADD COLUMN `education_level_id` INTEGER NULL,
    ADD COLUMN `income_range_id` INTEGER NULL,
    ADD COLUMN `occupation_id` INTEGER NULL,
    ADD COLUMN `relationship_status_id` INTEGER NULL,
    MODIFY `avatar` VARCHAR(255) NULL,
    MODIFY `bio` TEXT NULL,
    MODIFY `city` VARCHAR(255) NULL,
    MODIFY `country` VARCHAR(255) NULL,
    MODIFY `expectations_from_matchmaker` TEXT NULL,
    MODIFY `gender` VARCHAR(255) NULL,
    MODIFY `height` VARCHAR(50) NULL,
    MODIFY `introduction_video_link` VARCHAR(255) NULL,
    MODIFY `lessons_learned_from_past_relationships` TEXT NULL,
    MODIFY `past_relationship_experience` TEXT NULL,
    MODIFY `patterns_to_avoid_in_relationships` TEXT NULL,
    MODIFY `question_for_matchmaker` TEXT NULL,
    MODIFY `specific_partner_preferences` TEXT NULL,
    MODIFY `state` VARCHAR(255) NULL,
    MODIFY `weight` VARCHAR(50) NULL,
    MODIFY `zip_code` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `relocations` DROP COLUMN `name`,
    ADD COLUMN `location` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `relationship_statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `income_ranges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `range` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education_levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `occupations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_occupation_id_fkey` FOREIGN KEY (`occupation_id`) REFERENCES `occupations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_education_level_id_fkey` FOREIGN KEY (`education_level_id`) REFERENCES `education_levels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_income_range_id_fkey` FOREIGN KEY (`income_range_id`) REFERENCES `income_ranges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_relationship_status_id_fkey` FOREIGN KEY (`relationship_status_id`) REFERENCES `relationship_statuses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_statuses` ADD CONSTRAINT `relationship_statuses_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_statuses` ADD CONSTRAINT `relationship_statuses_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_ranges` ADD CONSTRAINT `income_ranges_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_ranges` ADD CONSTRAINT `income_ranges_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education_levels` ADD CONSTRAINT `education_levels_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education_levels` ADD CONSTRAINT `education_levels_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `occupations` ADD CONSTRAINT `occupations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `occupations` ADD CONSTRAINT `occupations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
