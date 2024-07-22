import { Request, Response } from 'express';
import { CreateTicketDto } from '../../domain';
import { prisma } from '../../data/postgres';
import { connect } from 'http2';


export class TicketsController {

    constructor() {}


    public createTicket = async(req: Request, res: Response) => {

        try {

            const [error, createTicketDto] = CreateTicketDto.create(req.body);
            if ( error ) return res.status(500).json({ error });

            // Buscamos el estatus 'pendiente por revisar'
            const statusPendiente = await prisma.status.findFirst({
                where: {
                    code: 'Penrev'
                }
            });
            if (!statusPendiente) return res.status(404).json({ error: 'Status pendiente por revisar no encontrado' });

            // Obtener el ID del usuario del token
            const userId = req.user.id;
            console.log(userId);
            
            
            const newTicket = await prisma.tickets.create({
                data: {
                    description: createTicketDto!.description,
                    catalogueId: createTicketDto!.catalogueId,
                    statusId: statusPendiente.id,
                    usersId: userId,
                    date: new Date()
                }
            });
            
            return res.status(201).json({ newTicket });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAllTickets = async(req: Request, res: Response) => {

        try {

            const allTickets = await prisma.tickets.findMany();
            if ( allTickets.length == 0 ) return res.status(400).json({ error: 'Nothing to show' });
            
            return res.status(200).json({ tickets: allTickets });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public deleteAllTickets = async(req: Request, res: Response) => {

        try {
            
            const deleteTickets = await prisma.tickets.deleteMany();
            if ( deleteTickets.count == 0 ) return res.status(400).json({ error: 'nothing to delete' });

            return res.status(200).json({ message: 'All tickets was deleted' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



