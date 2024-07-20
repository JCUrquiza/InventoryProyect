import { Router } from 'express';
import { ProductsController } from './controller';
import { authMiddleware } from '../../middlewares/authMiddleware';


export class ProductRoutes {

    static get routes(): Router {

        const router = Router();
        const product = new ProductsController();

        router.post('/create', product.createProduct);
        router.put('/update/:id', product.updateProduct);
        router.get('/getAll', product.getAll);
        router.delete('/delete/:id', authMiddleware, product.deleteOne);

        return router;
    }

}

