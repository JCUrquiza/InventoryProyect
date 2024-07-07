import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateWarehousesDto, UpdateWarehousesDto } from '../../domain';


export class WarehousesController {

    constructor() {}

    public createWarehouses = async(req: Request, res: Response) => {

        try {

            const [error, createWarehousesDto] = CreateWarehousesDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Verificar que el almacén a guardar no exista ya
            const wareHouseExist = await prisma.wareHouses.findFirst({
                where: { name: createWarehousesDto!.name }
            });
            if ( wareHouseExist ) return res.status(400).json({ error: 'Warehouse already exist' });

            const newWarehouse = await prisma.wareHouses.create({
                data: createWarehousesDto!
            });

            return res.status(201).json({ warehouse: newWarehouse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateWarehouse = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateWarehousesDto] = UpdateWarehousesDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            // Verificar que el almacén que quiero modificar exista:
            const warehouseExist = await prisma.wareHouses.findUnique({ where: { id: updateWarehousesDto!.id } });
            if ( !warehouseExist ) return res.status(400).json({ error: 'warehouse doesn´t exist' });

            const updateWarehouse = await prisma.wareHouses.update({
                where: {
                    id: updateWarehousesDto!.id
                },
                data: updateWarehousesDto!.values
            });
            
            return res.status(200).json({ updateWarehouse });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}


