-- CreateTable
CREATE TABLE `match_couples` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `match_maker_id` INTEGER NOT NULL,
    `couple_a_id` INTEGER NOT NULL,
    `couple_b_id` INTEGER NOT NULL,
    `match_status` ENUM('BAD', 'OK', 'GOOD', 'GREAT', 'EXCELLENT') NOT NULL,
    `stage` ENUM('INITIAL', 'CONTACTED', 'INTERVIEWED', 'MEETING_SCHEDULED', 'FEEDBACK_RECEIVED', 'FOLLOW_UP', 'CLOSED') NOT NULL DEFAULT 'INITIAL',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `creatorId` INTEGER NOT NULL,

    INDEX `idx_match_couple_match_maker_id`(`match_maker_id`),
    INDEX `idx_match_couple_couple_a_id`(`couple_a_id`),
    INDEX `idx_match_couple_couple_b_id`(`couple_b_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_match_maker_id_fkey` FOREIGN KEY (`match_maker_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_couple_a_id_fkey` FOREIGN KEY (`couple_a_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_couple_b_id_fkey` FOREIGN KEY (`couple_b_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_couples` ADD CONSTRAINT `match_couples_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
