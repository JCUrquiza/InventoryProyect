import { Router } from "express";
import { WarehousesByBranchController } from "./controller";



export class WarehousesByBranchRoutes {

    static get routes(): Router {
        
        const router = Router();
        const warehousesByBranch = new WarehousesByBranchController();

        router.post('/create-association', warehousesByBranch.createAssociation);

        return router;
    }

}
