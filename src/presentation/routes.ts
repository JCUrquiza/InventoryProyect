import { Router } from 'express';
import { CompanyRoutes } from './company/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/company', CompanyRoutes.routes);

        return router;
    }

}


