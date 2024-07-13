import { Router } from 'express';
import { CompanyRoutes } from './company/routes';
import { BranchesOfficesRoutes } from './branchOffices/routes';
import { WarehouseRoutes } from './wareHouses/routes';
import { ProductFamilyRoutes } from './productFamily/routes';
import { ProductRoutes } from './products/routes';
import { WarehousesByBranchRoutes } from './warehousesByBranch/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/company', CompanyRoutes.routes);
        router.use('/api/v1/branchesOffices', BranchesOfficesRoutes.routes);
        router.use('/api/v1/warehouse', WarehouseRoutes.routes);
        router.use('/api/v1/productFamily', ProductFamilyRoutes.routes);
        router.use('/api/v1/product', ProductRoutes.routes);
        router.use('/api/v1/warehousesByBranch', WarehousesByBranchRoutes.routes);

        return router;
    }

}


