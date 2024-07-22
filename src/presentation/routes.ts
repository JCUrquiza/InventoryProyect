import { Router } from 'express';
import { CompanyRoutes } from './company/routes';
import { BranchesOfficesRoutes } from './branchOffices/routes';
import { WarehouseRoutes } from './wareHouses/routes';
import { ProductFamilyRoutes } from './productFamily/routes';
import { ProductRoutes } from './products/routes';
import { WarehousesByBranchRoutes } from './warehousesByBranch/routes';
import { ProductsInWarehousesRoutes } from './productsInWarehouses/routes';
import { AuthRoutes } from './auth/routes';
import { CatalogueRoutes } from './catalogue/routes';
import { StatusRoutes } from './estatus/routes';
import { TicketsRoutes } from './ticketsModule/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);

        router.use('/api/v1/company', CompanyRoutes.routes);
        router.use('/api/v1/branchesOffices', BranchesOfficesRoutes.routes);
        router.use('/api/v1/warehouse', WarehouseRoutes.routes);
        router.use('/api/v1/productFamily', ProductFamilyRoutes.routes);
        router.use('/api/v1/product', ProductRoutes.routes);
        router.use('/api/v1/warehousesByBranch', WarehousesByBranchRoutes.routes);
        router.use('/api/v1/productsInWarehouses', ProductsInWarehousesRoutes.routes);

        router.use('/api/v1/catalogue', CatalogueRoutes.routes);
        router.use('/api/v1/estatus', StatusRoutes.routes);

        router.use('/api/v1/tickets', TicketsRoutes.routes);

        return router;
    }

}


