-- DropIndex
DROP INDEX `idx_file_original_name` ON `files`;

-- AlterTable
ALTER TABLE `files` MODIFY `original_name` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `testimonials` ADD COLUMN `author` VARCHAR(255) NOT NULL DEFAULT 'Anonymous';
