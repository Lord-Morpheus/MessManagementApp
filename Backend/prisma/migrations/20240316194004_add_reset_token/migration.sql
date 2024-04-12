/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_resetToken_key" ON "Student"("resetToken");
