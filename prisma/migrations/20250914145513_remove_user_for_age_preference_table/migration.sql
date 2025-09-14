/*
  Warnings:

  - You are about to drop the column `user_id` on the `age_preferences` table. All the data in the column will be lost.
  - Added the required column `id` to the `age_preferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `age_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `age_preferences` DROP FOREIGN KEY `age_preferences_user_id_fkey`;

-- DropIndex
DROP INDEX `age_preferences_user_id_key` ON `age_preferences`;

-- AlterTable
ALTER TABLE `age_preferences` DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `agePreferenceId` INTEGER NULL;
