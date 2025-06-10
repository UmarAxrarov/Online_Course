/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Teachers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseCategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[course_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[course_id,user_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPoint" DROP CONSTRAINT "UserPoint_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_CourseCategories" DROP CONSTRAINT "_CourseCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseCategories" DROP CONSTRAINT "_CourseCategories_B_fkey";

-- DropIndex
DROP INDEX "Like_user_id_course_id_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "course_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "teacher_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Teachers";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "_CourseCategories";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_course_id_key" ON "Category"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_course_id_user_id_key" ON "Like"("course_id", "user_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
