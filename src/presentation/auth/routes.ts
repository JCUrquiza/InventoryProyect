import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const authService = new AuthService();
        const authController = new AuthController(authService);

        router.post('/create-position', authController.createPositionUser);

        router.post('/register', authController.registerUser);
        router.post('/login', authController.loginUser);
        router.get('/validate-token', authController.validateToken);
        router.get('/getAll', authController.getAllUsers);
        router.delete('/deleteAll', authController.deleteUsers);

        return router;
    }

}
