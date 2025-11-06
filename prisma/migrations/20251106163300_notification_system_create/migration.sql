-- CreateTable
CREATE TABLE `mail_configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `host` VARCHAR(255) NOT NULL,
    `port` INTEGER NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
