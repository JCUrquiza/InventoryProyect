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

            // Buscamos que no exista esa relación sucursal-almacén
            const warehouseByBranch = await prisma.warehousesByBranch.findFirst({
                where: {
                    branchOfficesId: branchExist.id,
                    wareHousesId: warehouseExist.id
                }
            });
            if ( warehouseByBranch ) return res.status(400).json({ error: 'Association already created' });

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


    public getAllAssociations = async(req: Request, res: Response) => {

        try {
            const allAssociations = await prisma.warehousesByBranch.findMany({
                include: {
                    branchOffices: true,
                    wareHouses: true
                }
            });

            const respuesta = allAssociations.map( association => ({
                branchOffice: association.branchOffices,
                warehouse: association.wareHouses
            }));

            return res.status(200).json({ associations: respuesta });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



