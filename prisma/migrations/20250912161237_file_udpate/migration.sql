/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `age_preferences` DROP FOREIGN KEY `age_preferences_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `age_preferences` DROP FOREIGN KEY `age_preferences_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `age_preferences` DROP FOREIGN KEY `age_preferences_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `background_preferences` DROP FOREIGN KEY `background_preferences_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `background_preferences` DROP FOREIGN KEY `background_preferences_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `core_values` DROP FOREIGN KEY `core_values_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `core_values` DROP FOREIGN KEY `core_values_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `cultural_religious_preferences` DROP FOREIGN KEY `cultural_religious_preferences_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `cultural_religious_preferences` DROP FOREIGN KEY `cultural_religious_preferences_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `ethnicities` DROP FOREIGN KEY `ethnicities_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `ethnicities` DROP FOREIGN KEY `ethnicities_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `family_aspirations` DROP FOREIGN KEY `family_aspirations_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `family_aspirations` DROP FOREIGN KEY `family_aspirations_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `ideal_relationships` DROP FOREIGN KEY `ideal_relationships_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `ideal_relationships` DROP FOREIGN KEY `ideal_relationships_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `intellectual_interests` DROP FOREIGN KEY `intellectual_interests_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `intellectual_interests` DROP FOREIGN KEY `intellectual_interests_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `life_styles` DROP FOREIGN KEY `life_styles_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `life_styles` DROP FOREIGN KEY `life_styles_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `life_styles` DROP FOREIGN KEY `life_styles_userId_fkey`;

-- DropForeignKey
ALTER TABLE `luxury_alignments` DROP FOREIGN KEY `luxury_alignments_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `luxury_alignments` DROP FOREIGN KEY `luxury_alignments_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `partner_qualities` DROP FOREIGN KEY `partner_qualities_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `partner_qualities` DROP FOREIGN KEY `partner_qualities_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `personal_interests` DROP FOREIGN KEY `personal_interests_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `personal_interests` DROP FOREIGN KEY `personal_interests_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `personality_traits` DROP FOREIGN KEY `personality_traits_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `personality_traits` DROP FOREIGN KEY `personality_traits_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `physical_attributes` DROP FOREIGN KEY `physical_attributes_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `physical_attributes` DROP FOREIGN KEY `physical_attributes_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `relationship_expectations` DROP FOREIGN KEY `relationship_expectations_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `relationship_expectations` DROP FOREIGN KEY `relationship_expectations_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `relationship_timelines` DROP FOREIGN KEY `relationship_timelines_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `relationship_timelines` DROP FOREIGN KEY `relationship_timelines_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `religions` DROP FOREIGN KEY `religions_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `religions` DROP FOREIGN KEY `religions_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `relocations` DROP FOREIGN KEY `relocations_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `relocations` DROP FOREIGN KEY `relocations_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `social_activities` DROP FOREIGN KEY `social_activities_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `social_activities` DROP FOREIGN KEY `social_activities_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `social_circles` DROP FOREIGN KEY `social_circles_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `social_circles` DROP FOREIGN KEY `social_circles_updated_by_fkey`;

-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `subscriptions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `wellness_interests` DROP FOREIGN KEY `wellness_interests_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `wellness_interests` DROP FOREIGN KEY `wellness_interests_updated_by_fkey`;

-- DropIndex
DROP INDEX `Blog_author_id_fkey` ON `Blog`;

-- DropIndex
DROP INDEX `age_preferences_created_by_fkey` ON `age_preferences`;

-- DropIndex
DROP INDEX `age_preferences_updated_by_fkey` ON `age_preferences`;

-- DropIndex
DROP INDEX `background_preferences_created_by_fkey` ON `background_preferences`;

-- DropIndex
DROP INDEX `background_preferences_updated_by_fkey` ON `background_preferences`;

-- DropIndex
DROP INDEX `comments_user_id_fkey` ON `comments`;

-- DropIndex
DROP INDEX `core_values_created_by_fkey` ON `core_values`;

-- DropIndex
DROP INDEX `core_values_updated_by_fkey` ON `core_values`;

-- DropIndex
DROP INDEX `cultural_religious_preferences_created_by_fkey` ON `cultural_religious_preferences`;

-- DropIndex
DROP INDEX `cultural_religious_preferences_updated_by_fkey` ON `cultural_religious_preferences`;

-- DropIndex
DROP INDEX `ethnicities_created_by_fkey` ON `ethnicities`;

-- DropIndex
DROP INDEX `ethnicities_updated_by_fkey` ON `ethnicities`;

-- DropIndex
DROP INDEX `family_aspirations_created_by_fkey` ON `family_aspirations`;

-- DropIndex
DROP INDEX `family_aspirations_updated_by_fkey` ON `family_aspirations`;

-- DropIndex
DROP INDEX `ideal_relationships_created_by_fkey` ON `ideal_relationships`;

-- DropIndex
DROP INDEX `ideal_relationships_updated_by_fkey` ON `ideal_relationships`;

-- DropIndex
DROP INDEX `intellectual_interests_created_by_fkey` ON `intellectual_interests`;

-- DropIndex
DROP INDEX `intellectual_interests_updated_by_fkey` ON `intellectual_interests`;

-- DropIndex
DROP INDEX `life_styles_created_by_fkey` ON `life_styles`;

-- DropIndex
DROP INDEX `life_styles_updated_by_fkey` ON `life_styles`;

-- DropIndex
DROP INDEX `life_styles_userId_fkey` ON `life_styles`;

-- DropIndex
DROP INDEX `luxury_alignments_created_by_fkey` ON `luxury_alignments`;

-- DropIndex
DROP INDEX `luxury_alignments_updated_by_fkey` ON `luxury_alignments`;

-- DropIndex
DROP INDEX `partner_qualities_created_by_fkey` ON `partner_qualities`;

-- DropIndex
DROP INDEX `partner_qualities_updated_by_fkey` ON `partner_qualities`;

-- DropIndex
DROP INDEX `personal_interests_created_by_fkey` ON `personal_interests`;

-- DropIndex
DROP INDEX `personal_interests_updated_by_fkey` ON `personal_interests`;

-- DropIndex
DROP INDEX `personality_traits_created_by_fkey` ON `personality_traits`;

-- DropIndex
DROP INDEX `personality_traits_updated_by_fkey` ON `personality_traits`;

-- DropIndex
DROP INDEX `physical_attributes_created_by_fkey` ON `physical_attributes`;

-- DropIndex
DROP INDEX `physical_attributes_updated_by_fkey` ON `physical_attributes`;

-- DropIndex
DROP INDEX `relationship_expectations_created_by_fkey` ON `relationship_expectations`;

-- DropIndex
DROP INDEX `relationship_expectations_updated_by_fkey` ON `relationship_expectations`;

-- DropIndex
DROP INDEX `relationship_timelines_created_by_fkey` ON `relationship_timelines`;

-- DropIndex
DROP INDEX `relationship_timelines_updated_by_fkey` ON `relationship_timelines`;

-- DropIndex
DROP INDEX `religions_created_by_fkey` ON `religions`;

-- DropIndex
DROP INDEX `religions_updated_by_fkey` ON `religions`;

-- DropIndex
DROP INDEX `relocations_created_by_fkey` ON `relocations`;

-- DropIndex
DROP INDEX `relocations_updated_by_fkey` ON `relocations`;

-- DropIndex
DROP INDEX `social_activities_created_by_fkey` ON `social_activities`;

-- DropIndex
DROP INDEX `social_activities_updated_by_fkey` ON `social_activities`;

-- DropIndex
DROP INDEX `social_circles_created_by_fkey` ON `social_circles`;

-- DropIndex
DROP INDEX `social_circles_updated_by_fkey` ON `social_circles`;

-- DropIndex
DROP INDEX `subscriptions_user_id_fkey` ON `subscriptions`;

-- DropIndex
DROP INDEX `wellness_interests_created_by_fkey` ON `wellness_interests`;

-- DropIndex
DROP INDEX `wellness_interests_updated_by_fkey` ON `wellness_interests`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar_id` INTEGER NULL,
    `password` VARCHAR(255) NOT NULL,
    `reset_token` VARCHAR(255) NULL,
    `reset_token_expiry` DATETIME(3) NULL,
    `stripe_customer_id` VARCHAR(255) NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `original_name` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `uploadedBy` INTEGER NULL,

    UNIQUE INDEX `files_hash_key`(`hash`),
    INDEX `idx_file_original_name`(`original_name`),
    INDEX `idx_file_hash`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_usage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileId` INTEGER NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `model_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_file_usage_file_id`(`fileId`),
    INDEX `idx_file_usage_model_id`(`model_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
