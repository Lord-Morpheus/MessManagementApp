/*
  Warnings:

  - You are about to drop the column `resetToken` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `tokenExpiry` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_resetToken_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "resetToken",
DROP COLUMN "tokenExpiry",
ADD COLUMN     "OTP" TEXT,
ADD COLUMN     "OTP_EXPIRY" TIMESTAMP(3);
