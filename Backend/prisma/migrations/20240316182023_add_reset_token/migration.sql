-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "tokenExpiry" TIMESTAMP(3);
