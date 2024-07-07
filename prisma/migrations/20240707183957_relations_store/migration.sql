-- CreateTable
CREATE TABLE "branchOffices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "branchOffices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wareHouses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "wareHouses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehousesByBranch" (
    "id" SERIAL NOT NULL,
    "branchOfficesId" INTEGER NOT NULL,
    "wareHousesId" INTEGER NOT NULL,

    CONSTRAINT "warehousesByBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productFamily" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "productFamily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "salePrice" DECIMAL(65,30) NOT NULL,
    "productFamilyId" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productsInWarehouses" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,
    "warehousesByBranchId" INTEGER NOT NULL,

    CONSTRAINT "productsInWarehouses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "branchOffices" ADD CONSTRAINT "branchOffices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehousesByBranch" ADD CONSTRAINT "warehousesByBranch_branchOfficesId_fkey" FOREIGN KEY ("branchOfficesId") REFERENCES "branchOffices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehousesByBranch" ADD CONSTRAINT "warehousesByBranch_wareHousesId_fkey" FOREIGN KEY ("wareHousesId") REFERENCES "wareHouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_productFamilyId_fkey" FOREIGN KEY ("productFamilyId") REFERENCES "productFamily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsInWarehouses" ADD CONSTRAINT "productsInWarehouses_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productsInWarehouses" ADD CONSTRAINT "productsInWarehouses_warehousesByBranchId_fkey" FOREIGN KEY ("warehousesByBranchId") REFERENCES "warehousesByBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
