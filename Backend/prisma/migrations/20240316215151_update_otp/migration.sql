/*
  Warnings:

  - You are about to drop the column `studentId` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Otp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_studentId_fkey";

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "studentId",
DROP COLUMN "updatedAt";
