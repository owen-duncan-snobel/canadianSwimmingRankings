/*
  Warnings:

  - Made the column `time` on table `BestTimes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BestTimes" ALTER COLUMN "time" SET NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;
