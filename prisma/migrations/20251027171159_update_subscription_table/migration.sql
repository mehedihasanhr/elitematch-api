/*
  Warnings:

  - You are about to drop the column `messages_left` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `profile_views_left` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `video_calls_left` on the `subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subscriptions` DROP COLUMN `messages_left`,
    DROP COLUMN `profile_views_left`,
    DROP COLUMN `video_calls_left`,
    ADD COLUMN `messages_used` INTEGER NULL DEFAULT 0,
    ADD COLUMN `profiles_viewed` INTEGER NULL DEFAULT 0;
