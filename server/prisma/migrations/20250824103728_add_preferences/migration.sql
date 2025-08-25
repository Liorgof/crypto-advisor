-- CreateTable
CREATE TABLE "public"."Preference" (
    "userId" TEXT NOT NULL,
    "assets" TEXT[],
    "investorType" TEXT NOT NULL,
    "contentTypes" TEXT[],

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "public"."Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
