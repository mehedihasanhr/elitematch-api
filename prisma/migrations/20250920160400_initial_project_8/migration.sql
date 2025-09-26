/*
  Warnings:

  - You are about to alter the column `permission` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `permissions` MODIFY `permission` ENUM('create', 'update', 'read', 'delete') NULL;
