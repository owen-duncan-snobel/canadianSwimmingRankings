-- CreateTable
CREATE TABLE "public"."Athletes" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_year" INTEGER NOT NULL,
    "nation" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Athletes_pkey" PRIMARY KEY ("athlete_id")
);

-- CreateTable
CREATE TABLE "public"."BestTimes" (
    "event" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "points" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "meet_name" TEXT NOT NULL,
    "athlete_id" INTEGER NOT NULL,

    CONSTRAINT "BestTimes_pkey" PRIMARY KEY ("athlete_id","event","course")
);

-- AddForeignKey
ALTER TABLE "public"."BestTimes" ADD CONSTRAINT "BestTimes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "public"."Athletes"("athlete_id") ON DELETE RESTRICT ON UPDATE CASCADE;
