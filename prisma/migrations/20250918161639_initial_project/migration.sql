/*
  Warnings:

  - You are about to drop the column `avatar_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_cover_image_id_fkey`;

-- DropForeignKey
ALTER TABLE `blog_tags` DROP FOREIGN KEY `blog_tags_blog_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_blog_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_avatar_id_fkey`;

-- DropIndex
DROP INDEX `blog_tags_blog_id_fkey` ON `blog_tags`;

-- DropIndex
DROP INDEX `comments_blog_id_fkey` ON `comments`;

-- DropIndex
DROP INDEX `profiles_avatar_id_fkey` ON `profiles`;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `avatar_id`,
    MODIFY `date_of_birth` DATETIME(3) NULL;

-- DropTable
DROP TABLE `Blog`;

-- CreateTable
CREATE TABLE `blogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `published_at` DATETIME(3) NULL,
    `cover_image_id` INTEGER NOT NULL,
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
    `type` ENUM('ANALYTICS', 'TAG_MANAGER', 'ADSENSE', 'OTHER') NOT NULL,
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

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_cover_image_id_fkey` FOREIGN KEY (`cover_image_id`) REFERENCES `files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_seo` ADD CONSTRAINT `blog_seo_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_tags` ADD CONSTRAINT `blog_tags_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_metadata` ADD CONSTRAINT `site_metadata_logo_id_fkey` FOREIGN KEY (`logo_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `site_metadata` ADD CONSTRAINT `site_metadata_favicon_id_fkey` FOREIGN KEY (`favicon_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FileToProfile` ADD CONSTRAINT `_FileToProfile_A_fkey` FOREIGN KEY (`A`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FileToProfile` ADD CONSTRAINT `_FileToProfile_B_fkey` FOREIGN KEY (`B`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
