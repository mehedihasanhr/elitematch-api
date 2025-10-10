-- CreateTable
CREATE TABLE `Meetup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `match_couple_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meetup` ADD CONSTRAINT `Meetup_match_couple_id_fkey` FOREIGN KEY (`match_couple_id`) REFERENCES `match_couples`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
