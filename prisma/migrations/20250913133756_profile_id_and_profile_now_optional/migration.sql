-- AlterTable
ALTER TABLE `Blog` ADD COLUMN `category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `background_preferences` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `core_values` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `cultural_religious_preferences` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `ethnicities` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `family_aspirations` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `ideal_relationships` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `intellectual_interests` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `life_styles` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `luxury_alignments` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `partner_qualities` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `personal_interests` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `personality_traits` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `physical_attributes` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `relationship_expectations` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `relationship_timelines` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `religions` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `relocations` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `social_activities` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `social_circles` MODIFY `profile_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `wellness_interests` MODIFY `profile_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `blog_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `blog_categories_name_key`(`name`),
    UNIQUE INDEX `blog_categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
