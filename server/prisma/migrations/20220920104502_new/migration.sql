/*
  Warnings:

  - You are about to drop the column `userId` on the `sellers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sellerId]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "sellers" DROP CONSTRAINT "sellers_userId_fkey";

-- DropIndex
DROP INDEX "sellers_userId_key";

-- AlterTable
ALTER TABLE "Subscribers" ADD COLUMN     "sellerId" INTEGER;

-- AlterTable
ALTER TABLE "sellers" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_sellerId_key" ON "Subscribers"("sellerId");

-- AddForeignKey
ALTER TABLE "Subscribers" ADD CONSTRAINT "Subscribers_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
