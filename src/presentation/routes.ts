import { Router } from 'express';
import { CompanyRoutes } from './company/routes';
import { BranchesOfficesRoutes } from './branchOffices/routes';
import { WarehouseRoutes } from './wareHouses/routes';
import { ProductFamilyRoutes } from './productFamily/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/company', CompanyRoutes.routes);
        router.use('/api/branchesOffices', BranchesOfficesRoutes.routes);
        router.use('/api/warehouse', WarehouseRoutes.routes);
        router.use('/api/productFamily', ProductFamilyRoutes.routes);

        return router;
    }

}


