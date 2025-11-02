-- CreateTable
CREATE TABLE `payment_configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider` ENUM('STRIPE', 'PAYPAL', 'SQUARE', 'OTHER') NOT NULL,
    `secret_api_key` VARCHAR(300) NOT NULL,
    `public_api_key` VARCHAR(300) NULL,
    `webhook_secret` VARCHAR(300) NULL,
    `version` VARCHAR(50) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `mode` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment_configs_provider_key`(`provider`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
