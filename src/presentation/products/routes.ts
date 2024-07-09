import { Router } from 'express';
import { ProductsController } from './controller';


export class ProductRoutes {

    static get routes(): Router {

        const router = Router();
        const product = new ProductsController();

        router.post('/create', product.createProduct);
        router.put('/update/:id', product.updateProduct);
        router.get('/getAll', product.getAll);
        router.delete('/delete/:id', product.deleteOne);

        return router;
    }

}

