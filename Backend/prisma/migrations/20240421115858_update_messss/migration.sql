/*
  Warnings:

  - You are about to drop the column `messFormId` on the `Mess` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mess" DROP CONSTRAINT "Mess_messFormId_fkey";

-- AlterTable
ALTER TABLE "Mess" DROP COLUMN "messFormId";

-- AlterTable
ALTER TABLE "MessForm" ADD COLUMN     "preferences" TEXT[];
