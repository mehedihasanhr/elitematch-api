/*
  Warnings:

  - Added the required column `payment_status` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscriptions` ADD COLUMN `payment_status` VARCHAR(100) NOT NULL;
