-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BestTimes" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "time" TIMESTAMP(3),
    "points" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "meet_name" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,

    CONSTRAINT "BestTimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BestTimes" ADD CONSTRAINT "BestTimes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
