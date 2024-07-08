import { Router } from 'express';
import { ProductsController } from './controller';


export class ProductRoutes {

    static get routes(): Router {

        const router = Router();
        const product = new ProductsController();

        router.post('/create', product.createProduct);

        return router;
    }

}

