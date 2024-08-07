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
                    productsInWorkOrder: {
                        include: {
                            products: true
                        }
                    }
                }
            });

            return res.status(201).json({ workOrder: completeWorkOrder });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



