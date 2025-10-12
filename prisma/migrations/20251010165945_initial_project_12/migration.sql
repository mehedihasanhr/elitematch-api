-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar_id` INTEGER NULL,
    `password` VARCHAR(255) NOT NULL,
    `reset_token` VARCHAR(255) NULL,
    `reset_token_expiry` DATETIME(3) NULL,
    `stripe_customer_id` VARCHAR(255) NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `role_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `agePreferenceId` INTEGER NULL,

    UNIQUE INDEX `users_email_key`(`email`),
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

-- CreateTable
CREATE TABLE `match_makers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `experience_years` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `match_makers_user_id_key`(`user_id`),
    INDEX `idx_match_maker_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_couples` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `match_maker_id` INTEGER NOT NULL,
    `couple_a_id` INTEGER NOT NULL,
    `couple_b_id` INTEGER NOT NULL,
    `match_status` ENUM('BAD', 'OK', 'GOOD', 'GREAT', 'EXCELLENT') NOT NULL,
    `stage` ENUM('INITIAL', 'CONTACTED', 'INTERVIEWED', 'MEETING_SCHEDULED', 'FEEDBACK_RECEIVED', 'FOLLOW_UP', 'CLOSED') NOT NULL DEFAULT 'INITIAL',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `creatorId` INTEGER NOT NULL,

    INDEX `idx_match_couple_match_maker_id`(`match_maker_id`),
    INDEX `idx_match_couple_couple_a_id`(`couple_a_id`),
    INDEX `idx_match_couple_couple_b_id`(`couple_b_id`),
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
    `permission` ENUM('create', 'update', 'read', 'delete') NULL,
    `model` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_unique_permission`(`name`, `model`, `permission`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `introduction_video_link` VARCHAR(255) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `occupation_id` INTEGER NULL,
    `education_level_id` INTEGER NULL,
    `income_range_id` INTEGER NULL,
    `relationship_status_id` INTEGER NULL,
    `gender` VARCHAR(255) NULL,
    `bio` TEXT NULL,
    `city` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `zip_code` VARCHAR(20) NULL,
    `country` VARCHAR(255) NULL,
    `height` VARCHAR(50) NULL,
    `weight` VARCHAR(50) NULL,
    `no_of_children` INTEGER NULL DEFAULT 0,
    `specific_partner_preferences` TEXT NULL,
    `expectations_from_matchmaker` TEXT NULL,
    `question_for_matchmaker` TEXT NULL,
    `past_relationship_experience` TEXT NULL,
    `lessons_learned_from_past_relationships` TEXT NULL,
    `patterns_to_avoid_in_relationships` TEXT NULL,

    UNIQUE INDEX `profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `allergies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relationship_statuses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `income_ranges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
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

-- CreateTable
CREATE TABLE `relocations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `luxury_alignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `age_preferences` (
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
CREATE TABLE `physical_attributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
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
    `profile_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meetups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `match_couple_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rate_meetups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meetup_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` SMALLINT NOT NULL,
    `review` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_popular` BOOLEAN NOT NULL DEFAULT false,
    `is_trending` BOOLEAN NOT NULL DEFAULT false,
    `content` TEXT NOT NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `published_at` DATETIME(3) NULL,
    `cover_image_id` INTEGER NULL,
    `category_id` INTEGER NULL,

    UNIQUE INDEX `blogs_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_seo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blog_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `keywords` VARCHAR(255) NOT NULL,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blog_seo_blog_id_key`(`blog_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `blog_categories_name_key`(`name`),
    UNIQUE INDEX `blog_categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `blog_tags_name_key`(`name`),
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

-- CreateTable
CREATE TABLE `notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `publish_date` DATETIME(3) NOT NULL,
    `is_pinned` BOOLEAN NOT NULL DEFAULT false,
    `author_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter_subscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `newsletter_subscribers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `site_metadata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `organization` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `logo_id` INTEGER NULL,
    `favicon_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `google_scripts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `gtype` ENUM('ANALYTICS', 'TAG_MANAGER', 'ADSENSE', 'OTHER') NOT NULL,
    `script` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quick_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(100) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FileToProfile` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FileToProfile_AB_unique`(`A`, `B`),
    INDEX `_FileToProfile_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PermissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BlogToBlogTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BlogToBlogTag_AB_unique`(`A`, `B`),
    INDEX `_BlogToBlogTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_makers` ADD CONSTRAINT `match_makers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_match_maker_id_fkey` FOREIGN KEY (`match_maker_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_couple_a_id_fkey` FOREIGN KEY (`couple_a_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_couple_b_id_fkey` FOREIGN KEY (`couple_b_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_occupation_id_fkey` FOREIGN KEY (`occupation_id`) REFERENCES `occupations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_education_level_id_fkey` FOREIGN KEY (`education_level_id`) REFERENCES `education_levels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_income_range_id_fkey` FOREIGN KEY (`income_range_id`) REFERENCES `income_ranges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_relationship_status_id_fkey` FOREIGN KEY (`relationship_status_id`) REFERENCES `relationship_statuses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `love-languages` ADD CONSTRAINT `love-languages_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `love-languages` ADD CONSTRAINT `love-languages_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `love-languages` ADD CONSTRAINT `love-languages_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prefered_dates` ADD CONSTRAINT `prefered_dates_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prefered_dates` ADD CONSTRAINT `prefered_dates_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prefered_dates` ADD CONSTRAINT `prefered_dates_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `allergies` ADD CONSTRAINT `allergies_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergies` ADD CONSTRAINT `allergies_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergies` ADD CONSTRAINT `allergies_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relocations` ADD CONSTRAINT `relocations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `luxury_alignments` ADD CONSTRAINT `luxury_alignments_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_circles` ADD CONSTRAINT `social_circles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wellness_interests` ADD CONSTRAINT `wellness_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intellectual_interests` ADD CONSTRAINT `intellectual_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_interests` ADD CONSTRAINT `personal_interests_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personality_traits` ADD CONSTRAINT `personality_traits_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_aspirations` ADD CONSTRAINT `family_aspirations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_timelines` ADD CONSTRAINT `relationship_timelines_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ideal_relationships` ADD CONSTRAINT `ideal_relationships_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationship_expectations` ADD CONSTRAINT `relationship_expectations_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `social_activities` ADD CONSTRAINT `social_activities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultural_religious_preferences` ADD CONSTRAINT `cultural_religious_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core_values` ADD CONSTRAINT `core_values_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_styles` ADD CONSTRAINT `life_styles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_preferences` ADD CONSTRAINT `age_preferences_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_attributes` ADD CONSTRAINT `physical_attributes_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `background_preferences` ADD CONSTRAINT `background_preferences_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_qualities` ADD CONSTRAINT `partner_qualities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `religions` ADD CONSTRAINT `religions_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ethnicities` ADD CONSTRAINT `ethnicities_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meetups` ADD CONSTRAINT `meetups_match_couple_id_fkey` FOREIGN KEY (`match_couple_id`) REFERENCES `match_couples`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rate_meetups` ADD CONSTRAINT `rate_meetups_meetup_id_fkey` FOREIGN KEY (`meetup_id`) REFERENCES `meetups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rate_meetups` ADD CONSTRAINT `rate_meetups_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_cover_image_id_fkey` FOREIGN KEY (`cover_image_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_seo` ADD CONSTRAINT `blog_seo_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_metadata` ADD CONSTRAINT `site_metadata_logo_id_fkey` FOREIGN KEY (`logo_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_metadata` ADD CONSTRAINT `site_metadata_favicon_id_fkey` FOREIGN KEY (`favicon_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FileToProfile` ADD CONSTRAINT `_FileToProfile_A_fkey` FOREIGN KEY (`A`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FileToProfile` ADD CONSTRAINT `_FileToProfile_B_fkey` FOREIGN KEY (`B`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `blog_tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
