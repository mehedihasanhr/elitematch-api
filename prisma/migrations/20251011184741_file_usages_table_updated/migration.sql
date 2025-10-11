/*
  Warnings:

  - You are about to drop the column `company` on the `testimonials` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `testimonials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId,model,model_id]` on the table `file_usage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `testimonials` DROP COLUMN `company`,
    DROP COLUMN `position`;

-- CreateIndex
CREATE UNIQUE INDEX `file_usage_fileId_model_model_id_key` ON `file_usage`(`fileId`, `model`, `model_id`);
