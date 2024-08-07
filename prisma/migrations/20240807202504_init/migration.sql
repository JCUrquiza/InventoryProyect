-- CreateTable
CREATE TABLE "workOrder" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "priceOfLabor" INTEGER NOT NULL,
    "priceOfTransfer" INTEGER NOT NULL,
    "priceTotal" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "workOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productsInWorkOrder" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "workOrderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "productsInWorkOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workOrder" ADD CONSTRAINT "workOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workOrder" ADD CONSTRAINT "workOrder_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsInWorkOrder" ADD CONSTRAINT "productsInWorkOrder_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsInWorkOrder" ADD CONSTRAINT "productsInWorkOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
