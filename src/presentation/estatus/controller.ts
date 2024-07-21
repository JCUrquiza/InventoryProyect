import { Request, Response } from 'express';
// import { CreateEstatusDto, UpdateEstatusDto } from '../../domain';
import { prisma } from '../../data/postgres';
import { CreateStatusDto, UpdateStatusDto } from '../../domain';


export class StatusController {

    constructor() {}


    public createStatus = async(req: Request, res: Response) => {

        try {

            const [error, createStatusDto] = CreateStatusDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            const estatusExist = await prisma.status.findFirst({
                where: {
                    name: createStatusDto!.name,
                    code: createStatusDto!.code
                }
            });
            if ( estatusExist ) return res.status(400).json({ error: 'That name already exist' });

            const newEstatus = await prisma.status.create({
                data: createStatusDto!
            });

            return res.status(201).json({ newEstatus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateStatus = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateStatusDto] = UpdateStatusDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            const updateStatus = await prisma.status.update({
                where: {
                    id: updateStatusDto!.id
                },
                data: updateStatusDto!.values
            });
            
            return res.status(200).json({ statusUpdated: updateStatus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public getAllStatus = async(req: Request, res: Response) => {

        try {

            const getAllStatus = await prisma.status.findMany();
            if ( getAllStatus.length == 0 ) return res.status(404).json({ error: 'The status table are empty' });

            return res.status(200).json({ status: getAllStatus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public deleteAll = async(req: Request, res: Response) => {

        try {
            
            const deleteAllEstatus = await prisma.status.deleteMany();
            if ( deleteAllEstatus.count == 0 ) return res.status(400).json({ error: 'Nothing to delete' });

            return res.status(200).json({ message: 'All status was deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}


