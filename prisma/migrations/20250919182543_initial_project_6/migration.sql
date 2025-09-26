/*
  Warnings:

  - You are about to drop the column `blog_id` on the `blog_tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `blog_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `blog_tags` DROP FOREIGN KEY `blog_tags_blog_id_fkey`;

-- DropIndex
DROP INDEX `blog_tags_blog_id_fkey` ON `blog_tags`;

-- AlterTable
ALTER TABLE `blog_tags` DROP COLUMN `blog_id`,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `_BlogToBlogTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BlogToBlogTag_AB_unique`(`A`, `B`),
    INDEX `_BlogToBlogTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `blog_tags_name_key` ON `blog_tags`(`name`);

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `blog_tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
