/*
  Warnings:

  - You are about to drop the column `messages_used` on the `subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subscriptions` DROP COLUMN `messages_used`,
    ADD COLUMN `message_left` INTEGER NOT NULL DEFAULT 0;
