/*
  Warnings:

  - You are about to drop the column `cover_image` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `cover_image_id` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `cover_image`,
    ADD COLUMN `cover_image_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_cover_image_id_fkey` FOREIGN KEY (`cover_image_id`) REFERENCES `files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
