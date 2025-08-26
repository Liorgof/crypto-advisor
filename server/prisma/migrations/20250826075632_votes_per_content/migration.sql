/*
  Warnings:

  - A unique constraint covering the columns `[userId,section,content]` on the table `SectionVote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."SectionVote_userId_section_key";

-- CreateIndex
CREATE UNIQUE INDEX "SectionVote_userId_section_content_key" ON "public"."SectionVote"("userId", "section", "content");
