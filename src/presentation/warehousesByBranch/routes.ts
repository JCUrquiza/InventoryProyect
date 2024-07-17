import { Router } from "express";
import { WarehousesByBranchController } from "./controller";



export class WarehousesByBranchRoutes {

    static get routes(): Router {
        
        const router = Router();
        const warehousesByBranch = new WarehousesByBranchController();

        router.post('/create-association', warehousesByBranch.createAssociation);
        router.get('/getAll', warehousesByBranch.getAllAssociations);
        router.get('/getByBranch/:id', warehousesByBranch.getWarehousesByBranch);

        router.delete('/deleteAssociation', warehousesByBranch.deleteAssociationWarehousesByBranch);

        return router;
    }

}
