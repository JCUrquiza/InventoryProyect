import { Router } from "express";
import { WarehousesByBranchController } from "./controller";
import { authMiddleware } from "../../middlewares/authMiddleware";



export class WarehousesByBranchRoutes {

    static get routes(): Router {
        
        const router = Router();
        const warehousesByBranch = new WarehousesByBranchController();

        router.post('/create-association', warehousesByBranch.createAssociation);
        router.get('/getAll', warehousesByBranch.getAllAssociations);
        router.get('/getByBranch/:id', warehousesByBranch.getWarehousesByBranch);

        router.delete('/deleteAssociation', authMiddleware, warehousesByBranch.deleteAssociationWarehousesByBranch);

        return router;
    }

}
