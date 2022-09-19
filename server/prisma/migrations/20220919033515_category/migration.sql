/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_subCategoryId_fkey";

-- DropIndex
DROP INDEX "Category_subCategoryId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "subCategoryId";

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
