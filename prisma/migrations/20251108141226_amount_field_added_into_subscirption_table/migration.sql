/*
  Warnings:

  - Added the required column `amount_paid` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscriptions` ADD COLUMN `amount_paid` DOUBLE NOT NULL;
