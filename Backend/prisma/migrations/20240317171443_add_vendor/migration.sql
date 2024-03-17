/*
  Warnings:

  - You are about to drop the column `location` on the `Mess` table. All the data in the column will be lost.
  - Added the required column `vendorId` to the `Mess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mess" DROP COLUMN "location",
ADD COLUMN     "vendorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Vendor" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_username_key" ON "Vendor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- AddForeignKey
ALTER TABLE "Mess" ADD CONSTRAINT "Mess_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
