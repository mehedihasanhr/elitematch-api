-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_cover_image_id_fkey`;

-- DropIndex
DROP INDEX `blogs_cover_image_id_fkey` ON `blogs`;

-- AlterTable
ALTER TABLE `blogs` MODIFY `cover_image_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_cover_image_id_fkey` FOREIGN KEY (`cover_image_id`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
