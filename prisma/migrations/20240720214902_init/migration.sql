/*
  Warnings:

  - You are about to drop the column `ticketsId` on the `users` table. All the data in the column will be lost.
  - Added the required column `usersId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_ticketsId_fkey";

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "usersId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ticketsId";

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
