/*
  Warnings:

  - Added the required column `gender` to the `Athletes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athletes" ADD COLUMN     "gender" TEXT NOT NULL;
