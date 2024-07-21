import { Router } from 'express';
import { StatusController } from './controller';


export class StatusRoutes {

    static get routes(): Router {

        const router = Router();
        const statusController = new StatusController();

        router.post('/create', statusController.createStatus);
        router.put('/update/:id', statusController.updateStatus);
        router.get('/getAll', statusController.getAllStatus);
        router.delete('/deleteAll', statusController.deleteAll);

        return router;
    }

}

