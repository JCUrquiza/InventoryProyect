import { Router } from 'express';
import { ProductFamilyController } from './controller';
import { authMiddleware } from '../../middlewares/authMiddleware';


export class ProductFamilyRoutes {

    static get routes(): Router {

        const router = Router();
        const productFamily = new ProductFamilyController();

        router.post('/create', productFamily.createProductFamily);
        router.put('/update/:id', productFamily.updateProductFamily);
        router.get('/getAll', productFamily.getAll);
        router.delete('/delete/:id', authMiddleware, productFamily.deleteOne);

        return router;
    }

}