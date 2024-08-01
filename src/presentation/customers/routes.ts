import { Router } from 'express';
import { CustomerController } from './controller';


export class customerRoutes {

    static get routes(): Router{

        const router = Router();
        const customersController = new CustomerController();

        router.post('/create/type-customer', customersController.createTypeUser);
        router.get('/getAll/type-customer', customersController.getAllTypeCustomers);

        router.post('/create/customer', customersController.createCustomer);
        router.get('/getAll/customers', customersController.getAllCustomers);

        return router;
    }

}

