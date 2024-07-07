import { Router } from 'express';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.get('/api/todos', (req, res) => {
            res.json([
                { id: 1, text: 'Tubo 1', saludo: 'Hi' },
                { id: 2, text: 'Tubo 2', saludo: 'He' },
                { id: 3, text: 'Tubo 3', saludo: 'Hu' },
                { id: 4, text: 'Tubo 4', saludo: 'Ho' },
            ]);
        });

        return router;
    }

}


