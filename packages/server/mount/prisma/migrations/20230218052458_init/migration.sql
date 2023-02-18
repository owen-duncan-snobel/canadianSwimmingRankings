-- DropForeignKey
ALTER TABLE "BestTimes" DROP CONSTRAINT "BestTimes_athlete_id_fkey";

-- CreateTable
CREATE TABLE "Athletes" (
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_year" INTEGER NOT NULL,
    "nation" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,

    CONSTRAINT "Athletes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BestTimes" ADD CONSTRAINT "BestTimes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
