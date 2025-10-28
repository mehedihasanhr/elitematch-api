/*
  Warnings:

  - Made the column `messages_used` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profiles_viewed` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `subscriptions` MODIFY `messages_used` INTEGER NOT NULL DEFAULT 0,
    MODIFY `profiles_viewed` INTEGER NOT NULL DEFAULT 0;
