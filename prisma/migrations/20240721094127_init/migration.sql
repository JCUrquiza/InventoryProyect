/*
  Warnings:

  - You are about to drop the `estatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_estatusId_fkey";

-- DropTable
DROP TABLE "estatus";

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_estatusId_fkey" FOREIGN KEY ("estatusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
