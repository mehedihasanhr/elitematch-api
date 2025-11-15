/*
  Warnings:

  - You are about to drop the column `organization` on the `site_metadata` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `site_metadata` table. All the data in the column will be lost.
  - Added the required column `company_name` to the `site_metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagline` to the `site_metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `site_metadata` DROP COLUMN `organization`,
    DROP COLUMN `title`,
    ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `company_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `email` VARCHAR(255) NULL,
    ADD COLUMN `meta` JSON NULL,
    ADD COLUMN `phone` VARCHAR(15) NULL,
    ADD COLUMN `tagline` VARCHAR(255) NOT NULL,
    MODIFY `description` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `site_seo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NULL,
    `keywords` TEXT NULL,
    `og_title` VARCHAR(255) NULL,
    `og_type` VARCHAR(100) NULL,
    `og_description` VARCHAR(500) NULL,
    `canonical_url` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
