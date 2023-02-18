/*
  Warnings:

  - The primary key for the `Athletes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BestTimes" DROP CONSTRAINT "BestTimes_athlete_id_fkey";

-- AlterTable
ALTER TABLE "Athletes" DROP CONSTRAINT "Athletes_pkey",
ADD CONSTRAINT "Athletes_pkey" PRIMARY KEY ("athlete_id");

-- AddForeignKey
ALTER TABLE "BestTimes" ADD CONSTRAINT "BestTimes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Athletes"("athlete_id") ON DELETE RESTRICT ON UPDATE CASCADE;
