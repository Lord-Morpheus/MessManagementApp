/*
  Warnings:

  - You are about to drop the `_MessToVendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MessToVendor" DROP CONSTRAINT "_MessToVendor_A_fkey";

-- DropForeignKey
ALTER TABLE "_MessToVendor" DROP CONSTRAINT "_MessToVendor_B_fkey";

-- AlterTable
ALTER TABLE "Mess" ADD COLUMN     "firm" TEXT,
ADD COLUMN     "firmMail" TEXT;

-- DropTable
DROP TABLE "_MessToVendor";
