/*
  Warnings:

  - Added the required column `positionId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "positionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "functionality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "functionality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "functionalityId" INTEGER NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_functionalityId_fkey" FOREIGN KEY ("functionalityId") REFERENCES "functionality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
