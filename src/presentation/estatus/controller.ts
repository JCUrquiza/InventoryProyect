import { Request, Response } from 'express';
import { CreateEstatusDto, UpdateEstatusDto } from '../../domain';
import { prisma } from '../../data/postgres';


export class EstatusController {

    constructor() {}


    public createEstatus = async(req: Request, res: Response) => {

        try {

            const [error, createEstatusDto] = CreateEstatusDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            const estatusExist = await prisma.estatus.findFirst({
                where: {
                    name: createEstatusDto!.name,
                    code: createEstatusDto!.code
                }
            });
            if ( estatusExist ) return res.status(400).json({ error: 'That name already exist' });

            const newEstatus = await prisma.estatus.create({
                data: createEstatusDto!
            });

            return res.status(201).json({ newEstatus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateEstatus = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateEstatusDto] = UpdateEstatusDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            const updateEstatus = await prisma.estatus.update({
                where: {
                    id: updateEstatusDto!.id
                },
                data: updateEstatusDto!.values
            });
            
            return res.status(200).json({ statusUpdated: updateEstatus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public getAllStatus = async(req: Request, res: Response) => {

        try {

            const getAllStatus = await prisma.estatus.findMany();
            if ( getAllStatus.length == 0 ) return res.status(404).json({ error: 'The status table are empty' });

            return res.status(200).json({ status: getAllStatus });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}


