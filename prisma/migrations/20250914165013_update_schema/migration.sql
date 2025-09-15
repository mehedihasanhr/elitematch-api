/*
  Warnings:

  - You are about to drop the column `avatar` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `avatar`,
    ADD COLUMN `avatar_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
