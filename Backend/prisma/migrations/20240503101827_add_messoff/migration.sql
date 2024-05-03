-- CreateTable
CREATE TABLE "MessOff" (
    "_id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessOff_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "MessOff" ADD CONSTRAINT "MessOff_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
