/*
  Warnings:

  - You are about to drop the `Meetup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Meetup` DROP FOREIGN KEY `Meetup_match_couple_id_fkey`;

-- DropTable
DROP TABLE `Meetup`;

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

-- AddForeignKey
ALTER TABLE `meetups` ADD CONSTRAINT `meetups_match_couple_id_fkey` FOREIGN KEY (`match_couple_id`) REFERENCES `match_couples`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
