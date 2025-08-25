-- CreateEnum
CREATE TYPE "public"."Section" AS ENUM ('NEWS', 'PRICE', 'AI_INSIGHT', 'MEME');

-- CreateTable
CREATE TABLE "public"."SectionVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "section" "public"."Section" NOT NULL,
    "value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SectionVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionVote_userId_section_key" ON "public"."SectionVote"("userId", "section");

-- AddForeignKey
ALTER TABLE "public"."SectionVote" ADD CONSTRAINT "SectionVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
