/*
  Warnings:

  - The primary key for the `Peoples` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Peoples` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `totalsUp` on the `Peoples` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `totalsDown` on the `Peoples` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Peoples` DROP PRIMARY KEY,
    ADD COLUMN `down` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `up` INTEGER NOT NULL DEFAULT 0,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `totalsUp` INTEGER NOT NULL DEFAULT 0,
    MODIFY `totalsDown` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);
