/*
  Warnings:

  - You are about to drop the column `type` on the `google_scripts` table. All the data in the column will be lost.
  - Added the required column `gtype` to the `google_scripts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `google_scripts` DROP COLUMN `type`,
    ADD COLUMN `gtype` ENUM('ANALYTICS', 'TAG_MANAGER', 'ADSENSE', 'OTHER') NOT NULL;
