/*
  Warnings:

  - You are about to drop the `admin_notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `admin_notifications`;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `metaData` JSON NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
