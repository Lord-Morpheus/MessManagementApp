/*
  Warnings:

  - You are about to drop the column `messId` on the `Vendor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_messId_fkey";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "messId";

-- CreateTable
CREATE TABLE "_MessToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MessToVendor_AB_unique" ON "_MessToVendor"("A", "B");

-- CreateIndex
CREATE INDEX "_MessToVendor_B_index" ON "_MessToVendor"("B");

-- AddForeignKey
ALTER TABLE "_MessToVendor" ADD CONSTRAINT "_MessToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Mess"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessToVendor" ADD CONSTRAINT "_MessToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
