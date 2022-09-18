/*
  Warnings:

  - Made the column `role` on table `Subscribers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscribers" ALTER COLUMN "role" SET NOT NULL;
