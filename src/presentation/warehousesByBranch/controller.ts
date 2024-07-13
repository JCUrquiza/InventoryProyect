import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class WarehousesByBranchController {

    constructor() {}

    public createAssociation = async(req: Request, res: Response) => {

        try {

            const { idBranch, idWarehouse } = req.body;
            
            // Buscar que exista la sucursal de la request
            const branchExist = await prisma.branchOffices.findUnique({
                where: { id: idBranch }
            });
            if ( !branchExist ) return res.status(404).json({ error: `Branch with id: ${idBranch} doesn´t exist` });

            // Buscar que exista el almacén de la request
            const warehouseExist = await prisma.wareHouses.findUnique({
                where: { id: idWarehouse }
            });
            if ( !warehouseExist ) return res.status(404).json({ error: `Warehouse with id ${idWarehouse} doesn´t exist` });

            const associationWarehouseWithBranch = await prisma.warehousesByBranch.create({
                data: {
                    branchOfficesId: branchExist.id,
                    wareHousesId: warehouseExist.id
                }
            });

            return res.status(201).json({ associationWarehouseWithBranch })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



