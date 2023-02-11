/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BestTimes" DROP CONSTRAINT "BestTimes_athlete_id_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BestTimes" ADD CONSTRAINT "BestTimes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
