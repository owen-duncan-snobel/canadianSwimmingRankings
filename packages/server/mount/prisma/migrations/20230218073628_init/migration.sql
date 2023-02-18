/*
  Warnings:

  - The primary key for the `BestTimes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BestTimes" DROP CONSTRAINT "BestTimes_pkey",
ADD CONSTRAINT "BestTimes_pkey" PRIMARY KEY ("athlete_id", "event", "course");
