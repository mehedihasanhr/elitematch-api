/*
  Warnings:

  - You are about to drop the column `username` on the `mail_configs` table. All the data in the column will be lost.
  - Added the required column `user` to the `mail_configs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mail_configs` DROP COLUMN `username`,
    ADD COLUMN `user` VARCHAR(255) NOT NULL;
