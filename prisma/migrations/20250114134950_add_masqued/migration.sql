/*
  Warnings:

  - You are about to drop the `Projet` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ItemNavigation" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Passion" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SkillCategory" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "masqued" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Projet";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "imgSrc" TEXT,
    "projectLink" TEXT NOT NULL,
    "tags" TEXT[],
    "priority" INTEGER NOT NULL DEFAULT 0,
    "masqued" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
