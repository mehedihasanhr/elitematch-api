/*
  Warnings:

  - Made the column `max_profile_view` on table `subscription_plans` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max_messages` on table `subscription_plans` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max_video_call_make` on table `subscription_plans` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `subscription_plans` MODIFY `max_profile_view` INTEGER NOT NULL DEFAULT 1,
    MODIFY `max_messages` INTEGER NOT NULL DEFAULT 1,
    MODIFY `max_video_call_make` INTEGER NOT NULL DEFAULT 1;
