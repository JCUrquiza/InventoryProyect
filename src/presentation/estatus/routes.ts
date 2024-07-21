import { Router } from 'express';
import { EstatusController } from './controller';


export class EstatusRoutes {

    static get routes(): Router {

        const router = Router();
        const estatusController = new EstatusController();

        router.post('/create', estatusController.createEstatus);
        router.put('/update/:id', estatusController.updateEstatus);
        router.get('/getAll', estatusController.getAllStatus);

        return router;
    }

}

