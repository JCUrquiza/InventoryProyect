import { Router } from 'express';
import { CompanyController } from './controller';
import { authMiddleware } from '../../middlewares/authMiddleware';


export class CompanyRoutes {

    static get routes(): Router {

        const router = Router();
        const company = new CompanyController();

        router.post('/create', company.createCompany);
        router.put('/update/:id', company.updateCompany);
        router.get('/getAll', company.getAllCompanies);
        router.delete('/delete/:id', authMiddleware, company.deleteCompany);

        return router;
    }

}

