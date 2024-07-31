import { Request, Response } from 'express';
import { CreateTicketDto } from '../../domain';
import { prisma } from '../../data/postgres';


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

            const allTickets = await prisma.tickets.findMany({
                include: {
                    catalogue: true,
                    status: true,
                    users: true,
                }
            });
            if ( allTickets.length == 0 ) return res.status(400).json({ error: 'Nothing to show' });

            const response = allTickets.map( ticket => ({
                id: ticket.id,
                description: ticket.description,
                date: ticket.date,
                catalogue: ticket.catalogue,
                status: ticket.status,
                user: {
                    id: ticket.users.id,
                    name: ticket.users.name,        
                }
            }));
            
            return res.status(200).json({ tickets: response });
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

    public attendingTicket = async(req: Request, res: Response) => {

        try {
            
            const id = +req.params.id;
            const ticketDetails = await prisma.tickets.findUnique({
                where: {
                    id
                },
                include: {
                    status: true
                }
            });
            if ( !ticketDetails ) return res.status(400).json({ error: 'Ticket doesnt exist' });
            const currentTicketState = ticketDetails.status.code;

            let newState = '';
            if ( currentTicketState == 'Penrev' ) {
                newState = 'Atendo';
            } else {
                newState = 'Reslto';
            }

            const statusAttending = await prisma.status.findFirst({
                where: {
                    code: newState
                }
            });
            if ( !statusAttending ) return res.status(400).json({ error: 'status doesn´t exist'  });

            const ticket = await prisma.tickets.update({
                where: {
                    id
                },
                data: {
                    statusId: statusAttending.id
                },
                include: {
                    catalogue: true,
                    status: true,
                    users: true,
                }
            });
            if ( !ticket ) return res.status(400).json({ error: 'Ticket doesn´t exist' });

            const response = {
                id: ticket.id,
                description: ticket.description,
                date: ticket.date,
                catalogue: ticket.catalogue,
                status: ticket.status,
                user: {
                    id: ticket.users.id,
                    name: ticket.users.name,        
                }
            }
            
            return res.status(200).json({ ticketUpdated: response });
        } catch (error: any) {
            console.log(error);
            if ( error.code == 'P2025' ) {
                return res.status(500).json({ error: error.meta.cause });
            }
            return res.status(500).json({ error });
        }

    }

}



