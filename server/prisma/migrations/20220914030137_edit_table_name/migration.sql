/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "password" TEXT NOT NULL,
    "voucher" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
