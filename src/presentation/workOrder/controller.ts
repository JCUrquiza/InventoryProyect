import { Request, Response } from 'express';
import { CreateWorkOrderDto } from '../../domain/dtos/workOrder/create-workOrder.dto';
import { prisma } from '../../data/postgres';


export class WorkOrderController {

    constructor() {}

    public createWorkOrder = async(req: Request, res: Response) => {

        try {

            const statusPendiente = await prisma.status.findFirst({
                where: {
                    code: 'Penrev'
                }
            });
            if ( !statusPendiente ) return res.status(400).json({ error: 'status not found' });
            const statusPendienteId = statusPendiente.id;

            const [error, createWorkOrderDto] = CreateWorkOrderDto.create({...req.body, statusPendienteId});
            if ( error ) return res.status(400).json({ error });

            const customer = await prisma.customers.findFirst({
                where: {
                    id: createWorkOrderDto?.customerId
                }
            });

            const newWorkOrder = await prisma.workOrder.create({
                data: {
                    address: createWorkOrderDto!.address,
                    priceOfLabor: createWorkOrderDto!.priceOfLabor,
                    priceOfTransfer: createWorkOrderDto!.priceOfTransfer,
                    priceTotal: createWorkOrderDto!.priceTotal,
                    customerId: customer!.id,
                    statusId: statusPendienteId
                },
                include: {
                    productsInWorkOrder: true
                }
            });

            for(const listProduct of createWorkOrderDto!.products) {
                const product = await prisma.products.findUnique({
                    where: {
                        id: listProduct.id
                    }
                });

                await prisma.productsInWorkOrder.create({
                    data: {
                        quantity: listProduct.quantity,
                        workOrderId: newWorkOrder.id,
                        productId: product!.id
                    }
                });

            }
            
            // Recupera la work order completa con los productos
            const completeWorkOrder = await prisma.workOrder.findUnique({
                where: {
                    id: newWorkOrder.id,
                },
                include: {
                    customers: {
                        include: {
                            typeCustomer: true,
                            branchOffice: true,
                            status: true
                        }
                    },
                    status: true,
                    productsInWorkOrder: {
                        include: {
                            products: {
                                include: {
                                    productFamily: true
                                }
                            }
                        }
                    }
                }
            });

            const productsOfWorkOrder = completeWorkOrder?.productsInWorkOrder.map( ( product) => ({
                idproductWorkOrder: product.id,
                quantity: product.quantity,
                workOrderId: product.workOrderId,
                product: {
                    id: product.products.id,
                    name: product.products.name,
                    codigoSKU: product.products.codigoSKU,
                    salePrice: product.products.salePrice,
                    productFamily: {
                        id: product.products.productFamily.id,
                        name: product.products.productFamily.name,
                    }
                }
            }));
        
            const response = {
                id: completeWorkOrder?.id,
                address: completeWorkOrder?.address,
                priceOfLabor: completeWorkOrder?.priceOfLabor,
                priceOfTransfer: completeWorkOrder?.priceOfTransfer,
                priceTotal: completeWorkOrder?.priceTotal,
                customer: {
                    id: completeWorkOrder?.customers.id,
                    name: completeWorkOrder?.customers.name,
                    apellidoPaterno: completeWorkOrder?.customers.apellidoPaterno,
                    apellidoMaterno: completeWorkOrder?.customers.apellidoMaterno ,
                    email: completeWorkOrder?.customers.email,
                    address: completeWorkOrder?.customers.address,
                    telephone: completeWorkOrder?.customers.telephone,
                    typeCustomer: {
                        id: completeWorkOrder?.customers.typeCustomer.id,
                        name: completeWorkOrder?.customers.typeCustomer.name
                    },
                    branchOffice: {
                        id: completeWorkOrder?.customers.branchOffice.id,
                        name: completeWorkOrder?.customers.branchOffice.name
                    },
                    status: {
                        id: completeWorkOrder?.customers.status.id,
                        name: completeWorkOrder?.customers.status.name,
                        code: completeWorkOrder?.customers.status.code,
                        color: completeWorkOrder?.customers.status.color
                    }
                },
                status: {
                    id: completeWorkOrder?.status.id,
                    name: completeWorkOrder?.status.name,
                    code: completeWorkOrder?.status.code,
                    color: completeWorkOrder?.status.color
                },
                products: productsOfWorkOrder
            }

            return res.status(201).json({ workOrder: response });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



