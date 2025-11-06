/*
  Warnings:

  - You are about to drop the column `metaData` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `metaData`,
    ADD COLUMN `metadata` JSON NULL;
