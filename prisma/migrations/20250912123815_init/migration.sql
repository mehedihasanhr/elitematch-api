-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
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
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `role_permissions_role_id_permission_id_key`(`role_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(255) NOT NULL,
    `introduction_video_link` VARCHAR(255) NOT NULL,
    `occupation` VARCHAR(255) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `educationLevel` VARCHAR(255) NOT NULL,
    `income_range` VARCHAR(255) NOT NULL,
    `relationship_status` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `bio` TEXT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `zip_code` VARCHAR(20) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `height` VARCHAR(50) NOT NULL,
    `weight` VARCHAR(50) NOT NULL,
    `no_of_children` INTEGER NULL DEFAULT 0,
    `specific_partner_preferences` TEXT NOT NULL,
    `expectations_from_matchmaker` TEXT NOT NULL,
    `question_for_matchmaker` TEXT NOT NULL,
    `past_relationship_experience` TEXT NOT NULL,
    `lessons_learned_from_past_relationships` TEXT NOT NULL,
    `patterns_to_avoid_in_relationships` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `luxury_alignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_circles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wellness_interests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `intellectual_interests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_interests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personality_traits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family_aspirations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relationship_timelines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ideal_relationships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relationship_expectations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relocations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cultural_religious_preferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `core_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `life_styles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `profileId` INTEGER NULL,

    UNIQUE INDEX `profiles_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physical_attributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `background_preferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partner_qualities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `religions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ethnicities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `published_at` DATETIME(3) NULL,
    `cover_image` VARCHAR(255) NULL,

    UNIQUE INDEX `Blog_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blog_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `blog_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `data` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cms_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription_plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `price` DOUBLE NOT NULL,
    `duration_days` INTEGER NOT NULL DEFAULT 30,
    `max_profile_view` INTEGER NULL DEFAULT 1,
    `max_messages` INTEGER NULL DEFAULT 1,
    `max_video_call_make` INTEGER NULL DEFAULT 1,
    `match_maker_access` BOOLEAN NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `plan_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATETIME(3) NULL,
    `profile_views_left` INTEGER NULL DEFAULT 0,
    `messages_left` INTEGER NULL DEFAULT 0,
    `video_calls_left` INTEGER NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_tags` ADD CONSTRAINT `blog_tags_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
