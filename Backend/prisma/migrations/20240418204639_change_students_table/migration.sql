/*
  Warnings:

  - You are about to drop the column `hostel` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "hostel",
ADD COLUMN     "hostelId" TEXT;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
