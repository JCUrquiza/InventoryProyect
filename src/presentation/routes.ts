import { Router } from 'express';
import { CompanyRoutes } from './company/routes';
import { BranchesOfficesRoutes } from './branchOffices/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/company', CompanyRoutes.routes);
        router.use('/api/branchesOffices', BranchesOfficesRoutes.routes);

        return router;
    }

}


