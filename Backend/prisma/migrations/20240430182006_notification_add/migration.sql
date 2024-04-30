/*
  Warnings:

  - You are about to drop the column `rating` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `title` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "rating",
DROP COLUMN "type",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Notification" (
    "_id" TEXT NOT NULL,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("_id")
);
