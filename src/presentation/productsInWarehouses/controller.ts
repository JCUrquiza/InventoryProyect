import { Request, Response } from 'express';
import { CreateProductsInWarehousesDto, ReadProductsInWarehousesDto, UpdateProductsInWarehousesDto } from '../../domain';
import { prisma } from '../../data/postgres';

export class ProductInWarehousesController {

    constructor() {}

    public createProductInWarehouse = async(req: Request, res: Response) => {

        try {

            const [error, dto] = CreateProductsInWarehousesDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Buscamos la sucursal, el almacén y el producto
            const branchOfficeExist = await prisma.branchOffices.findUnique({
                where: {
                    id: dto!.branchOfficeId
                }
            });
            if ( !branchOfficeExist ) return res.status(404).json({ error: 'Branchoffice doesn´t exists' });

            const warehouseExist = await prisma.wareHouses.findUnique({
                where: {
                    id: dto!.warehouseId
                }
            });
            if ( !warehouseExist ) return res.status(404).json({ error: 'Warehouse doesn´t exists' });

            const productExist = await prisma.products.findUnique({
                where: {
                    id: dto!.productId
                }
            });
            if ( !productExist ) return res.status(404).json({ error: 'Product doesn´t exists' });

            const warehouseByBranchExist = await prisma.warehousesByBranch.findFirst({
                where: {
                    branchOfficesId: dto!.branchOfficeId,
                    wareHousesId: dto!.warehouseId
                }
            });
            if ( !warehouseByBranchExist ) return res.status(404).json({ error: 'warehouse doesn´t exist in that branchOffice' });

            // Evitar duplicados
            const productsExistInWarehouseInBranch = await prisma.productsInWarehouses.findFirst({
                where: {
                    warehousesByBranchId: +warehouseByBranchExist.id,
                    productsId: dto!.productId,
                }
            });
            if ( productsExistInWarehouseInBranch ) return res.status(400).json({ error: 'Product already exist in that warehouse' });

            const productsInWarehouseInBranch = await prisma.productsInWarehouses.create({
                data: {
                    warehousesByBranchId: +warehouseByBranchExist.id,
                    productsId: dto!.productId,
                    quantity: dto!.quantity
                }
            });


            return res.status(201).json({ productsInWarehouseInBranch });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public updateQuantityOfProduct = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;

            const [ error, updateProductsInWarehousesDto ] = UpdateProductsInWarehousesDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            // Buscamos el producto en el almacén de la sucursal
            const productInWarehouseByBranch = await prisma.productsInWarehouses.update({
                where: { id },
                data: {
                    quantity: updateProductsInWarehousesDto!.quantity
                },
                include: {
                    warehousesByBranch: {
                        include: {
                            branchOffices: true,
                            wareHouses: true
                        }
                    },
                    products: {
                        include: {
                            productFamily: true
                        }
                    }
                }
            });

            const response = {
                id: productInWarehouseByBranch.id,
                quantity: productInWarehouseByBranch.quantity,
                warehousesByBranch: {
                    branch: {
                        id: productInWarehouseByBranch.warehousesByBranch.branchOffices.id,
                        name: productInWarehouseByBranch.warehousesByBranch.branchOffices.name,
                    },
                    warehouse: {
                        id: productInWarehouseByBranch.warehousesByBranch.wareHouses.id,
                        name: productInWarehouseByBranch.warehousesByBranch.wareHouses.name,
                    }
                },
                product: {
                    productFamily: {
                        id: productInWarehouseByBranch.products.productFamily.id,
                        name: productInWarehouseByBranch.products.productFamily.name,
                    },
                    id: productInWarehouseByBranch.products.id,
                    name: productInWarehouseByBranch.products.name
                }
            };
            
            return res.status(200).json({ productInWarehouse: response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public getProductsByWarehousesAndBranches = async(req: Request, res: Response) => {

        try {
            
            const [error, dto] = ReadProductsInWarehousesDto.create(req.body);
            if ( error ) return res.status(400).json({ error });
            
            // Buscamos sucursal, almacén y almacénEnSucursal:
            const branchOfficeExist = await prisma.branchOffices.findUnique({
                where: {
                    id: dto!.branchOfficeId
                }
            });
            if ( !branchOfficeExist ) return res.status(404).json({ error: 'Branchoffice doesn´t exist' });

            const warehouseExist = await prisma.wareHouses.findUnique({
                where: {
                    id: dto!.warehouseId
                }
            });
            if ( !warehouseExist ) return res.status(404).json({ error: 'warehouse doesn´t exist' });

            const warehouseInBranch = await prisma.warehousesByBranch.findFirst({
                where: {
                    branchOfficesId: dto!.branchOfficeId,
                    wareHousesId: dto!.warehouseId
                }
            });
            if ( !warehouseInBranch ) return res.status(404).json({ error: 'Warehouse doesn´t exist' });

            const productsInWarehouseBranch = await prisma.productsInWarehouses.findMany({
                where: {
                    warehousesByBranchId: warehouseInBranch.id
                },
                include: {
                    warehousesByBranch: {
                        include: {
                            branchOffices: true,
                            wareHouses: true
                        }
                    },
                    products: {
                        include: {
                            productFamily: true
                        }
                    }
                }
            });
            if ( productsInWarehouseBranch.length === 0 ) return res.status(404).json({
                error: 'There are no products in that warehouse'
            });

            const response = productsInWarehouseBranch.map( product => ({
                id: product.id,
                quantity: product.quantity,
                warehousesByBranch: {
                    branch: {
                        id: product.warehousesByBranch.branchOffices.id,
                        name: product.warehousesByBranch.branchOffices.name,
                    },
                    warehouse: {
                        id: product.warehousesByBranch.wareHouses.id,
                        name: product.warehousesByBranch.wareHouses.name,
                    }
                },
                product: {
                    productFamily: {
                        id: product.products.productFamily.id,
                        name: product.products.productFamily.name,
                    },
                    id: product.products.id,
                    name: product.products.name
                }
            }));

            return res.status(200).json({ productsInWarehouse: response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public deleteProductInWarehouse = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;

            const productInWarehouseExist = await prisma.productsInWarehouses.findUnique({
                where: {
                    id
                }
            });
            if ( !productInWarehouseExist ) return res.status(404).json({ error: 'Product not found' });

            await prisma.productsInWarehouses.delete({
                where: { id }
            });
            
            return res.status(200).json({ message: 'Product deleted successfully' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public moveProductBetweenWarehouses = async(req: Request, res: Response) => {

        const { branchSourceId, warehouseSourceId, wahouseTargetId, products } = req.body;
        if ( !branchSourceId || !warehouseSourceId || !wahouseTargetId || !products ) return res.status(400).json({ error: 'Falta info' }); 

        try {

            // Inicia la transacción:
            await prisma.$transaction(async (prisma) => {

                // Buscamos que la sucursal y los almacenes existan
                const branchSource = await prisma.branchOffices.findUnique({
                    where: {
                        id: branchSourceId
                    }
                });
                if ( !branchSource ) return res.status(404).json({ error: 'Branch office doesn´t exist' });
                const warehouseSource = await prisma.wareHouses.findUnique({
                    where: {
                        id: warehouseSourceId
                    }
                });
                if ( !warehouseSource ) return res.status(404).json({ error: 'Warehouse source doesn´t exist' });
                const warehouseTarget = await prisma.wareHouses.findUnique({
                    where: {
                        id: wahouseTargetId
                    }
                });
                if ( !warehouseTarget ) return res.status(404).json({ error: 'Warehouse source doesn´t exist' });

                const warehouseSourceByBranch = await prisma.warehousesByBranch.findFirst({
                    where: {
                        branchOfficesId: branchSource.id,
                        wareHousesId: warehouseSource.id
                    }
                });
                if ( !warehouseSourceByBranch ) return res.status(404).json({ error: 'warehouse in branch doesn´t exist' });
                
                const warehousesTargetByBranch = await prisma.warehousesByBranch.findFirst({
                    where: {
                        branchOfficesId: branchSource.id,
                        wareHousesId: warehouseTarget.id
                    }
                });
                if ( !warehousesTargetByBranch ) return res.status(404).json({ error: 'warehouse in branch doesn´t exist' });
                
                for(const product of products) {

                    const productsUpdate = await prisma.products.findUnique({
                        where: {
                            id: product.id
                        }
                    });
                    if ( !productsUpdate ) return res.status(404).json({ error: 'Product doesn´t exist' });
    
                    const productInWarehouseSource = await prisma.productsInWarehouses.findFirst({
                        where: {
                            warehousesByBranchId: warehouseSourceByBranch.id,
                            productsId: product.id
                        }
                    });
                    if ( !productInWarehouseSource ) return res.status(404).json({ error: 'Product doesn´t exist' });
    
                    const productQuantity = productInWarehouseSource.quantity;
                    if ( productQuantity <= product.quantity ) return res.status(400).json({ error: 'Can´t be zero' });
    
                    const newProductQuantityInSource = productQuantity - product.quantity;
                    
                    // Cantidad en almacén origen
                    await prisma.productsInWarehouses.update({
                        where: {
                            warehousesByBranchId_productsId: {
                                warehousesByBranchId: warehouseSourceByBranch.id,
                                productsId: product.id
                            }
                        },
                        data: {
                            quantity: newProductQuantityInSource
                        }
                    });

                    // Verificar si el producto ya existe en el almacén de destino
                    const productInWarehouseTarget = await prisma.productsInWarehouses.findFirst({
                        where: {
                            warehousesByBranchId: warehousesTargetByBranch.id,
                            productsId: product.id
                        }
                    });

                    if (productInWarehouseTarget) {
                        // Si el producto ya existe en el almacén de destino, actualizar la cantidad
                        await prisma.productsInWarehouses.update({
                            where: {
                                warehousesByBranchId_productsId: {
                                    warehousesByBranchId: warehousesTargetByBranch.id,
                                    productsId: product.id
                                }
                            },
                            data: { quantity: productInWarehouseTarget.quantity + product.quantity }
                        });
                    } else {
                        // Si el producto no existe en el almacén de destino, crear una nueva entrada
                        await prisma.productsInWarehouses.create({
                            data: {
                                warehousesByBranchId: warehousesTargetByBranch.id,
                                productsId: product.id,
                                quantity: product.quantity
                            }
                        });
                    }
    
                }
            
            });       

            return res.status(200).json({ message: 'Transfer products successfully' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }



    public destroyDataBase = async(req: Request, res: Response) => {

        try {

            await prisma.productsInWarehouses.deleteMany();
            await prisma.warehousesByBranch.deleteMany();
            await prisma.wareHouses.deleteMany();
            await prisma.products.deleteMany();
            await prisma.productFamily.deleteMany();
            await prisma.branchOffices.deleteMany();

            return res.status(200).json({ message: 'All database is empty' })
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



