-- CreateTable
CREATE TABLE `rate_meetups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meetup_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rate_meetups` ADD CONSTRAINT `rate_meetups_meetup_id_fkey` FOREIGN KEY (`meetup_id`) REFERENCES `meetups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rate_meetups` ADD CONSTRAINT `rate_meetups_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
