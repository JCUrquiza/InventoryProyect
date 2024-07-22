/*
  Warnings:

  - You are about to drop the column `estatusId` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[statusId,catalogueId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statusId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_estatusId_fkey";

-- DropIndex
DROP INDEX "tickets_estatusId_catalogueId_key";

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "estatusId",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tickets_statusId_catalogueId_key" ON "tickets"("statusId", "catalogueId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
