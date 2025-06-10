/*
  Warnings:

  - You are about to drop the column `course_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_CourseCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourseCategories" DROP CONSTRAINT "_CourseCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseCategories" DROP CONSTRAINT "_CourseCategories_B_fkey";

-- DropIndex
DROP INDEX "Category_course_id_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "course_id";

-- DropTable
DROP TABLE "_CourseCategories";

-- CreateTable
CREATE TABLE "CategoryCourse" (
    "categoryId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CategoryCourse_pkey" PRIMARY KEY ("categoryId","courseId")
);

-- AddForeignKey
ALTER TABLE "CategoryCourse" ADD CONSTRAINT "CategoryCourse_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryCourse" ADD CONSTRAINT "CategoryCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
