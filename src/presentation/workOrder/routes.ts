import { Router } from "express";
import { WorkOrderController } from "./controller";


export class WorkOrderRoutes {

    static get routes(): Router {

        const router = Router();
        const workOrderController = new WorkOrderController();

        router.post('/create', workOrderController.createWorkOrder);
        router.get('/getAll', workOrderController.listOfWorkOrders);
        router.get('/detail/:id', workOrderController.workOrderDetails);
        router.delete('/deleteAll', workOrderController.deleteAllWorkOrders);
        router.post('/update/status', workOrderController.updateStatus);

        return router;
    }

}


