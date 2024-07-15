import { Router } from 'express';
import { ProductInWarehousesController } from './controller';


export class ProductsInWarehousesRoutes {

    static get routes(): Router {

        const router = Router();
        const productInWarehouse = new ProductInWarehousesController();

        router.post('/create', productInWarehouse.createProductInWarehouse);
        router.post('/getProductsByWarehouse', productInWarehouse.getProductsByWarehousesAndBranches);

        return router;
    }

}

