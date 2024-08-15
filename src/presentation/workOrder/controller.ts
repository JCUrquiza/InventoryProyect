import { Request, Response } from 'express';
import { CreateWorkOrderDto } from '../../domain/dtos/workOrder/create-workOrder.dto';
import { prisma } from '../../data/postgres';
import { UpdateWorkOrderStatus } from '../../domain/dtos/workOrder/update-status.dto';


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

    public listOfWorkOrders = async(req: Request, res: Response) => {

        try {

            const workOrder = await prisma.workOrder.findMany({
                include: {
                    customers: {
                        include: {
                            typeCustomer: true,
                            branchOffice: true,
                        }
                    },
                    status: true
                }
            });
            if ( workOrder.length == 0 ) return res.status(400).json({ error: 'Theresnt work orders to show' });

            const response = workOrder.map( workOrder => ({
                id: workOrder.id,
                address: workOrder.address,
                priceTotal: workOrder.priceTotal,
                customer: {
                    id: workOrder.customers.id,
                    name: workOrder.customers.name,
                    apellidoPaterno: workOrder.customers.apellidoPaterno,
                    apellidoMaterno: workOrder.customers.apellidoMaterno,
                    typeCustomerId: {
                        id: workOrder.customers.typeCustomer.id,
                        name: workOrder.customers.typeCustomer.name,
                    },
                    branchOfficeId: {
                        id: workOrder.customers.branchOffice.id,
                        name: workOrder.customers.branchOffice.name
                    }
                },
                statusId: {
                    id: workOrder.status.id,
                    name: workOrder.status.name,
                    code: workOrder.status.code,
                    color: workOrder.status.color
                },
            }));

            return res.status(200).json({ workOrder: response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public workOrderDetails = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;

            const workOrder = await prisma.workOrder.findUnique({
                where: {
                    id
                },
                include: {
                    customers: true,
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
            if ( !workOrder ) return res.status(400).json({ error: 'Work Order not exist' });

            const products = workOrder.productsInWorkOrder.map( product => ({
                id: product.id,
                quantity: product.quantity,
                product: {
                    id: product.products.id,
                    name: product.products.name,
                    codigoSKU: product.products.codigoSKU,
                    productFamily: {
                        id: product.products.productFamily.id,
                        name: product.products.productFamily.name
                    }
                }
            }));

            const response = {
                id: workOrder.id,
                address: workOrder.address,
                priceOfLabor: workOrder.priceOfLabor,
                priceOfTransfer: workOrder.priceOfTransfer,
                priceTotal: workOrder.priceTotal,
                customer: {
                    id: workOrder.customers.id,
                    apellidoPaterno: workOrder.customers.apellidoPaterno,
                    apellidoMaterno: workOrder.customers.apellidoMaterno,
                    email: workOrder.customers.email,
                    address: workOrder.customers.address,
                    telephone: workOrder.customers.telephone
                },
                status: {
                    id: workOrder.status.id,
                    name: workOrder.status.name,
                    code: workOrder.status.code,
                    color: workOrder.status.color
                },
                products: products
            }

            return res.status(200).json({ workOrder: response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public deleteAllWorkOrders = async(req: Request, res: Response) => {

        try {
            
            await prisma.productsInWorkOrder.deleteMany();
            await prisma.workOrder.deleteMany();

            return res.status(200).json({ message: 'All workOrders was deleted succesfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateStatus = async(req: Request, res: Response) => {

        try {
            
            const [error, updateWorkOrderStatus] = UpdateWorkOrderStatus.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Buscamos la orden dde trabajo
            const workOrderExist = await prisma.workOrder.findUnique({
                where: {
                    id: updateWorkOrderStatus!.id
                }
            });
            if ( !workOrderExist ) return res.status(404).json({ error: 'workOrder not found' });

            const statusExist = await prisma.status.findFirst({
                where: {
                    code: updateWorkOrderStatus!.codeStatus
                }
            });
            if ( !statusExist ) return res.status(404).json({ error: 'statusCode doesnt exists' });

            await prisma.workOrder.update({
                where: {
                    id: updateWorkOrderStatus!.id
                },
                data: {
                    statusId: statusExist.id
                }
            });

            return res.status(200).json({ message: 'WorkOrder updated sucessfully' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



