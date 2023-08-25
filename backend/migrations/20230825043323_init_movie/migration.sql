-- CreateTable
CREATE TABLE `Movie` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `sortTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `my_tomatoScore` INTEGER NOT NULL DEFAULT 0,
    `my_runtime` INTEGER NULL DEFAULT 0,
    `my_releaseYear` INTEGER NULL DEFAULT 0,
    `my_handicap` INTEGER NULL DEFAULT 0,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `my_decade` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `Movie_my_tomatoScore_key`(`my_tomatoScore`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
