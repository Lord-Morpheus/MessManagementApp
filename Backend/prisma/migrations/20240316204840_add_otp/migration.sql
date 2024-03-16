/*
  Warnings:

  - You are about to drop the column `OTP` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `OTP_EXPIRY` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "OTP",
DROP COLUMN "OTP_EXPIRY";

-- CreateTable
CREATE TABLE "OTP" (
    "_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_key_key" ON "OTP"("key");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_key" ON "OTP"("email");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
