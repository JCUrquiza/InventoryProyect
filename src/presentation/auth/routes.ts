import { Router } from 'express';
import { AuthController } from './controller';


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const authController = new AuthController();

        router.post('/login', authController.loginUser);
        router.post('/register', authController.registerUser);

        router.get('/validate-email/:token', authController.validateToken);

        return router;
    }

}
