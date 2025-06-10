/*
  Warnings:

  - You are about to drop the `Language_Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ru_name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ua_name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uz_name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Language_Category" DROP CONSTRAINT "Language_Category_category_id_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "ru_name" TEXT NOT NULL,
ADD COLUMN     "ua_name" TEXT NOT NULL,
ADD COLUMN     "uz_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Language_Category";
