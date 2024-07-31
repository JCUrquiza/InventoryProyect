import { Router } from 'express';
import { CatalogueController } from './controller';


export class CatalogueRoutes {

    static get routes(): Router {

        const router = Router();
        const catalogueController = new CatalogueController();

        router.post('/create', catalogueController.createCatalogue);
        router.get('/getAll', catalogueController.getAll);
        router.put('/update/:id', catalogueController.updateCatalogue);
        router.delete('/deleteAll', catalogueController.deleteAll);

        return router;
    }

}

