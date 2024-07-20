/*
  Warnings:

  - Added the required column `ticketsId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "ticketsId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "estatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "estatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "module" TEXT NOT NULL,

    CONSTRAINT "catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "catalogueId" INTEGER NOT NULL,
    "estatusId" INTEGER NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_estatusId_catalogueId_key" ON "tickets"("estatusId", "catalogueId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ticketsId_fkey" FOREIGN KEY ("ticketsId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_estatusId_fkey" FOREIGN KEY ("estatusId") REFERENCES "estatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
