import { Router } from 'express';
import { TicketsController } from './controller';
import { authMiddleware } from '../../middlewares/authMiddleware';


export class TicketsRoutes {

    static get routes(): Router {

        const router = Router();
        const ticketsController = new TicketsController();

        router.post('/create', authMiddleware, ticketsController.createTicket);
        router.get('/getAll', ticketsController.getAllTickets);
        router.delete('/deleteAll', ticketsController.deleteAllTickets);
        router.get('/attending/:id', ticketsController.attendingTicket);

        return router;
    }

}

