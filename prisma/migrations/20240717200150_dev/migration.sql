/*
  Warnings:

  - A unique constraint covering the columns `[warehousesByBranchId,productsId]` on the table `productsInWarehouses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "codigoSKU" TEXT NOT NULL DEFAULT '000000';

-- CreateIndex
CREATE UNIQUE INDEX "productsInWarehouses_warehousesByBranchId_productsId_key" ON "productsInWarehouses"("warehousesByBranchId", "productsId");
