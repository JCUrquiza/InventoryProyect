import { Router } from 'express';
import { CompanyController } from './controller';


export class CompanyRoutes {

    static get routes(): Router {

        const router = Router();
        const company = new CompanyController();

        router.post('/create', company.createCompany);
        router.put('/update/:id', company.updateCompany);
        router.get('/getAll', company.getAllCompanies);

        return router;
    }

}

