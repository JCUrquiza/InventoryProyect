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

            // Creamos el almacén
            const newWarehouse = await prisma.wareHouses.create({
                data: createWarehousesDto!
            });

            // Buscamos todas las sucursales
            const allBranches = await prisma.branchOffices.findMany();

            // Creamos un registro en warehousesByBranch para cada almacén
            const warehousesByBranch = allBranches.map( branch => ({
                branchOfficesId: branch.id,
                wareHousesId: newWarehouse.id
            }));
            await prisma.warehousesByBranch.createMany({
                data: warehousesByBranch
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

    public getAll = async(req: Request, res: Response) => {

        const allWarehouses = await prisma.wareHouses.findMany();
        if ( allWarehouses.length === 0 ) return res.status(400).json({ error: 'There´s nothing to show' });
        
        return res.status(200).json({ warehouses: allWarehouses });
    }

    public deleteOne = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
    
            // Buscamos si existe el almacén
            const warehouseExist = await prisma.wareHouses.findUnique({ where: { id } });
            if ( !warehouseExist ) return res.status(404).json({ error: 'Warehouse doesn´t exist' });
    
            const warehousesDeleted = await prisma.wareHouses.delete({ where: {id} });
            
            return res.status(200).json({ message: `Warehouses deleted: ${warehousesDeleted.name}` });
            
        } catch (error: any) {
            console.log(error);
            if ( error.code == 'P2003' ) {
                return res.status(500).json({ error: 'Cannot be deleted because it has dependencies' });
            }
            return res.status(500).json({ error });
        }

    }

}


