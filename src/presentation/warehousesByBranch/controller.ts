import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { DeleteWarehousesByBranchDto } from '../../domain';


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
            if ( allAssociations.length === 0 ) return res.status(404).json({ error: 'There are no results to show' });

            const respuesta = allAssociations.map( association => ({
                id: association.id,
                branchOffice: association.branchOffices,
                warehouse: association.wareHouses
            }));

            return res.status(200).json({ associations: respuesta });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public getWarehousesByBranch = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;

            // Buscamos la sucursal
            const branch = await prisma.branchOffices.findUnique({
                where: {
                    id: id
                }
            });
            if ( !branch ) return res.status(404).json({ error: 'BranchOffice doesn´t exists' });

            const warehousesByBranch = await prisma.warehousesByBranch.findMany({
                where: {
                    branchOfficesId: branch.id
                },
                include: {
                    branchOffices: true,
                    wareHouses: true
                }
            });
            if ( warehousesByBranch.length === 0 ) return res.status(400).json({ error: 'This branch does´not have warehouses' });

            const respuesta = warehousesByBranch.map( association => ({
                branchOffice: association.branchOffices,
                warehouse: association.wareHouses
            }));

            return res.status(200).json({ warehouses: respuesta });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public update = () => {}


    public deleteAssociationWarehousesByBranch = async(req: Request, res: Response) => {

        try {

            const [error, deleteWarehousesByBranchDto] = DeleteWarehousesByBranchDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Buscamos la sucursal, el almacén y la relación:
            if ( !!deleteWarehousesByBranchDto?.idWarehouseByBranch ) {
                await prisma.warehousesByBranch.delete({
                    where: {
                        id: deleteWarehousesByBranchDto.idWarehouseByBranch
                    }
                });

                return res.status(200).json({ message: 'warehouseByBranch was deleted' });
            }
            if ( !!deleteWarehousesByBranchDto?.idWarehouse ) {
                // Buscamos el almacén y luego eliminamos
                const warehouseExist = await prisma.wareHouses.findUnique({
                    where: {
                        id: deleteWarehousesByBranchDto.idWarehouse
                    }
                });
                if ( !warehouseExist ) return res.status(404).json({ error: 'warehouse doesn´t exist' });

                await prisma.warehousesByBranch.deleteMany({
                    where: {
                        wareHousesId: deleteWarehousesByBranchDto.idWarehouse
                    }
                });

                return res.status(200).json({ message: 'warehousesByBranch were deleted' });
            }
            if ( !!deleteWarehousesByBranchDto?.idBranchOffice ) {
                // Buscamos la sucursal y luego borramos
                const branchofficeExist = await prisma.branchOffices.findUnique({
                    where: {
                        id: deleteWarehousesByBranchDto.idBranchOffice
                    }
                });
                if ( !branchofficeExist ) return res.status(404).json({ message: 'branchoffice doesn´t exist' });

                await prisma.warehousesByBranch.deleteMany({
                    where: {
                        branchOfficesId: deleteWarehousesByBranchDto.idBranchOffice
                    }
                });

                return res.status(200).json({ message: 'warehousesByBranch were deleted' });
            }
            
        } catch (error: any) {
            console.log(error);
            if ( error.code == 'P2025' ) {
                return res.status(500).json({ error: error.meta.cause });
            }
            return res.status(500).json({ error });
        }

    }


}



