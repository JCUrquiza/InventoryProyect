import { Router } from 'express';
import { EstatusController } from './controller';


export class EstatusRoutes {

    static get routes(): Router {

        const router = Router();
        const estatusController = new EstatusController();

        // router.post('/create', company.createCompany);

        return router;
    }

}

