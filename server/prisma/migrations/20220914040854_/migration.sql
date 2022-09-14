/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "password" TEXT NOT NULL,
    "voucher" TEXT NOT NULL,
    "accountStatus" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
