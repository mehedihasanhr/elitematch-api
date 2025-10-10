/*
  Warnings:

  - Added the required column `rating` to the `rate_meetups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rate_meetups` ADD COLUMN `rating` SMALLINT NOT NULL,
    ADD COLUMN `review` TEXT NULL;
