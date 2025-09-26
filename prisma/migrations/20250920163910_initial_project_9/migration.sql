/*
  Warnings:

  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `role_permissions` DROP FOREIGN KEY `role_permissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_permissions` DROP FOREIGN KEY `role_permissions_role_id_fkey`;

-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `description` TEXT NULL;

-- DropTable
DROP TABLE `role_permissions`;

-- CreateTable
CREATE TABLE `_PermissionToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PermissionToRole_AB_unique`(`A`, `B`),
    INDEX `_PermissionToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_unique_permission` ON `permissions`(`name`, `model`, `permission`);

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PermissionToRole` ADD CONSTRAINT `_PermissionToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
