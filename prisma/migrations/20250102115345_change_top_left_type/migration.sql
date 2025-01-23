/*
  Warnings:

  - The `top` column on the `Passion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `left` column on the `Passion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Passion" DROP COLUMN "top",
ADD COLUMN     "top" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "left",
ADD COLUMN     "left" INTEGER NOT NULL DEFAULT 0;
