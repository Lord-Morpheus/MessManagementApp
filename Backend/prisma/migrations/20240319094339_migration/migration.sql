/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Mess` table. All the data in the column will be lost.
  - You are about to drop the column `mess` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mess" DROP CONSTRAINT "Mess_vendorId_fkey";

-- AlterTable
ALTER TABLE "Mess" DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "mess";

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "messId" TEXT;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_messId_fkey" FOREIGN KEY ("messId") REFERENCES "Mess"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
