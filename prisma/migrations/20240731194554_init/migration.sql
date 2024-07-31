-- CreateTable
CREATE TABLE "typeCustomer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "typeCustomerId" INTEGER NOT NULL,
    "branchOfficeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firstDocuments" (
    "id" SERIAL NOT NULL,
    "dateAutorizaition" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "catalogueId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "firstDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secondDocuments" (
    "id" SERIAL NOT NULL,
    "dateAutorization" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "catalogueId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "secondDocuments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_typeCustomerId_fkey" FOREIGN KEY ("typeCustomerId") REFERENCES "typeCustomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "branchOffices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firstDocuments" ADD CONSTRAINT "firstDocuments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firstDocuments" ADD CONSTRAINT "firstDocuments_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firstDocuments" ADD CONSTRAINT "firstDocuments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firstDocuments" ADD CONSTRAINT "firstDocuments_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secondDocuments" ADD CONSTRAINT "secondDocuments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secondDocuments" ADD CONSTRAINT "secondDocuments_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secondDocuments" ADD CONSTRAINT "secondDocuments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secondDocuments" ADD CONSTRAINT "secondDocuments_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
