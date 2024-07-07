import { Router } from 'express';
import { BranchesOfficesController } from './controller';


export class BranchesOfficesRoutes {

    static get routes(): Router {

        const router = Router();
        const branchOffices = new BranchesOfficesController();

        router.post('/create', branchOffices.createBranchOffice);
        router.put('/update/:id', branchOffices.updateBranchOffice);
        router.get('/getAll', branchOffices.getAllBranchesSources);
        router.delete('/deleteAll', branchOffices.deleteBranchOffice);

        return router;
    }

}
