/*
  Warnings:

  - You are about to drop the column `slug` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `model` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissioin` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationLevel` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectations_from_matchmaker` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_range` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction_video_link` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessons_learned_from_past_relationships` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `past_relationship_experience` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patterns_to_avoid_in_relationships` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_for_matchmaker` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationship_status` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specific_partner_preferences` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `background_preferences` DROP FOREIGN KEY `background_preferences_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `core_values` DROP FOREIGN KEY `core_values_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `cultural_religious_preferences` DROP FOREIGN KEY `cultural_religious_preferences_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `ethnicities` DROP FOREIGN KEY `ethnicities_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `family_aspirations` DROP FOREIGN KEY `family_aspirations_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `ideal_relationships` DROP FOREIGN KEY `ideal_relationships_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `intellectual_interests` DROP FOREIGN KEY `intellectual_interests_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `life_styles` DROP FOREIGN KEY `life_styles_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `luxury_alignments` DROP FOREIGN KEY `luxury_alignments_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `partner_qualities` DROP FOREIGN KEY `partner_qualities_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `personal_interests` DROP FOREIGN KEY `personal_interests_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `personality_traits` DROP FOREIGN KEY `personality_traits_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `physical_attributes` DROP FOREIGN KEY `physical_attributes_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `relationship_expectations` DROP FOREIGN KEY `relationship_expectations_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `relationship_timelines` DROP FOREIGN KEY `relationship_timelines_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `religions` DROP FOREIGN KEY `religions_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `relocations` DROP FOREIGN KEY `relocations_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `social_activities` DROP FOREIGN KEY `social_activities_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `social_circles` DROP FOREIGN KEY `social_circles_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `wellness_interests` DROP FOREIGN KEY `wellness_interests_profile_id_fkey`;

-- DropIndex
DROP INDEX `background_preferences_profile_id_fkey` ON `background_preferences`;

-- DropIndex
DROP INDEX `core_values_profile_id_fkey` ON `core_values`;

-- DropIndex
DROP INDEX `cultural_religious_preferences_profile_id_fkey` ON `cultural_religious_preferences`;

-- DropIndex
DROP INDEX `ethnicities_profile_id_fkey` ON `ethnicities`;

-- DropIndex
DROP INDEX `family_aspirations_profile_id_fkey` ON `family_aspirations`;

-- DropIndex
DROP INDEX `ideal_relationships_profile_id_fkey` ON `ideal_relationships`;

-- DropIndex
DROP INDEX `intellectual_interests_profile_id_fkey` ON `intellectual_interests`;

-- DropIndex
DROP INDEX `life_styles_profile_id_fkey` ON `life_styles`;

-- DropIndex
DROP INDEX `luxury_alignments_profile_id_fkey` ON `luxury_alignments`;

-- DropIndex
DROP INDEX `partner_qualities_profile_id_fkey` ON `partner_qualities`;

-- DropIndex
DROP INDEX `permissions_slug_key` ON `permissions`;

-- DropIndex
DROP INDEX `personal_interests_profile_id_fkey` ON `personal_interests`;

-- DropIndex
DROP INDEX `personality_traits_profile_id_fkey` ON `personality_traits`;

-- DropIndex
DROP INDEX `physical_attributes_profile_id_fkey` ON `physical_attributes`;

-- DropIndex
DROP INDEX `profiles_created_by_fkey` ON `profiles`;

-- DropIndex
DROP INDEX `profiles_profileId_fkey` ON `profiles`;

-- DropIndex
DROP INDEX `profiles_updated_by_fkey` ON `profiles`;

-- DropIndex
DROP INDEX `profiles_user_id_key` ON `profiles`;

-- DropIndex
DROP INDEX `relationship_expectations_profile_id_fkey` ON `relationship_expectations`;

-- DropIndex
DROP INDEX `relationship_timelines_profile_id_fkey` ON `relationship_timelines`;

-- DropIndex
DROP INDEX `religions_profile_id_fkey` ON `religions`;

-- DropIndex
DROP INDEX `relocations_profile_id_fkey` ON `relocations`;

-- DropIndex
DROP INDEX `social_activities_profile_id_fkey` ON `social_activities`;

-- DropIndex
DROP INDEX `social_circles_profile_id_fkey` ON `social_circles`;

-- DropIndex
DROP INDEX `wellness_interests_profile_id_fkey` ON `wellness_interests`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `slug`,
    ADD COLUMN `model` VARCHAR(255) NOT NULL,
    ADD COLUMN `permissioin` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `created_at`,
    DROP COLUMN `created_by`,
    DROP COLUMN `profileId`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `updated_by`,
    DROP COLUMN `user_id`,
    ADD COLUMN `avatar` VARCHAR(255) NOT NULL,
    ADD COLUMN `bio` TEXT NOT NULL,
    ADD COLUMN `city` VARCHAR(255) NOT NULL,
    ADD COLUMN `country` VARCHAR(255) NOT NULL,
    ADD COLUMN `date_of_birth` DATETIME(3) NOT NULL,
    ADD COLUMN `educationLevel` VARCHAR(255) NOT NULL,
    ADD COLUMN `expectations_from_matchmaker` TEXT NOT NULL,
    ADD COLUMN `gender` VARCHAR(255) NOT NULL,
    ADD COLUMN `height` VARCHAR(50) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `income_range` VARCHAR(255) NOT NULL,
    ADD COLUMN `introduction_video_link` VARCHAR(255) NOT NULL,
    ADD COLUMN `lessons_learned_from_past_relationships` TEXT NOT NULL,
    ADD COLUMN `no_of_children` INTEGER NULL DEFAULT 0,
    ADD COLUMN `occupation` VARCHAR(255) NOT NULL,
    ADD COLUMN `past_relationship_experience` TEXT NOT NULL,
    ADD COLUMN `patterns_to_avoid_in_relationships` TEXT NOT NULL,
    ADD COLUMN `question_for_matchmaker` TEXT NOT NULL,
    ADD COLUMN `relationship_status` VARCHAR(255) NOT NULL,
    ADD COLUMN `specific_partner_preferences` TEXT NOT NULL,
    ADD COLUMN `state` VARCHAR(255) NOT NULL,
    ADD COLUMN `weight` VARCHAR(50) NOT NULL,
    ADD COLUMN `zip_code` VARCHAR(20) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Profile`;

-- CreateTable
CREATE TABLE `age_preferences` (
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `profileId` INTEGER NULL,

    UNIQUE INDEX `age_preferences_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
