/*
  Warnings:

  - You are about to drop the column `user_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `video_or_img` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[course_id,client_id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Language_Category" DROP CONSTRAINT "Language_Category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_course_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPoint" DROP CONSTRAINT "UserPoint_user_id_fkey";

-- DropIndex
DROP INDEX "Like_course_id_user_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "user_id",
ADD COLUMN     "client_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "user_id",
DROP COLUMN "video_or_img",
ADD COLUMN     "categoryies_names" TEXT[],
ADD COLUMN     "imgs" TEXT[],
ADD COLUMN     "teacher_id" INTEGER NOT NULL,
ADD COLUMN     "videos" TEXT[];

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "user_id",
ADD COLUMN     "client_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "audios" TEXT[],
ADD COLUMN     "imgs" TEXT[];

-- AlterTable
ALTER TABLE "UserPoint" ALTER COLUMN "points" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "_CourseCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseCategories_B_index" ON "_CourseCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Like_course_id_client_id_key" ON "Like"("course_id", "client_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language_Category" ADD CONSTRAINT "Language_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseCategories" ADD CONSTRAINT "_CourseCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseCategories" ADD CONSTRAINT "_CourseCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
