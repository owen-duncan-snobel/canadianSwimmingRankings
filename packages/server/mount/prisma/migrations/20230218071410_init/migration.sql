/*
  Warnings:

  - The primary key for the `BestTimes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BestTimes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BestTimes" DROP CONSTRAINT "BestTimes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "BestTimes_pkey" PRIMARY KEY ("athlete_id", "event");
