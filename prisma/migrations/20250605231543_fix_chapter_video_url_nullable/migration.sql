/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `StripeCustomer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "videoUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_key" ON "StripeCustomer"("userId");
