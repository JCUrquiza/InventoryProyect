import { Router } from "express";
import { WorkOrderController } from "./controller";


export class WorkOrderRoutes {

    static get routes(): Router {

        const router = Router();
        const workOrderController = new WorkOrderController();

        router.post('/create', workOrderController.createWorkOrder);

        return router;
    }

}


