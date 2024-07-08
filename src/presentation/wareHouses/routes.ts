import { Router } from 'express';
import { WarehousesController } from './controller';


export class WarehouseRoutes {

    static get routes(): Router {

        const router = Router();
        const warehouse = new WarehousesController();

        router.post('/create', warehouse.createWarehouses);
        router.put('/update/:id', warehouse.updateWarehouse);
        router.get('/getAll', warehouse.getAll);
        router.delete('/delete/:id', warehouse.deleteOne);

        return router;
    }

}

