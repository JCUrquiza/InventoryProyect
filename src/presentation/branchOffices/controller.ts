import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateBranchOfficeDto, UpdateBranchOfficeDto } from '../../domain';


export class BranchesOfficesController {

    constructor() {}

    public createBranchOffice = async(req: Request, res: Response) => {

        try {

            const [error, createBranchOfficeDto] = CreateBranchOfficeDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Buscamos la empresa para guardarla en la sucursal
            const company = await prisma.company.findUnique({
                where: {
                    id: createBranchOfficeDto!.companyId
                }
            });
            if ( !company ) return res.status(404).json({ error: 'Company not found, maybe doesn´t exist' });

            // Verificamos que la sucursal a guardar no exista ya
            const branchOfficeExist = await prisma.branchOffices.findFirst({
                where: {
                    name: createBranchOfficeDto!.name
                }
            });
            if ( branchOfficeExist ) return res.status(400).json({ error: 'Branch office already exist' });
            
            // Creamos la sucursal
            const newBranchOffice = await prisma.branchOffices.create({
                data: createBranchOfficeDto!
            });

            // Buscamos todos los almacenes
            const allWarehouses = await prisma.wareHouses.findMany();

            // Crear una entrada en warehousesByBranch para cada almacén
            const warehousesByBranchData = allWarehouses.map(warehouse => ({
                branchOfficesId: newBranchOffice.id,
                wareHousesId: warehouse.id
            }));
            await prisma.warehousesByBranch.createMany({
                data: warehousesByBranchData
            });
            
            return res.status(201).json({ branchOffice: newBranchOffice });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateBranchOffice = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateBranchOfficeDto] = UpdateBranchOfficeDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            // Buscar si la sucursal a modificar existe
            const branchOfficeExist = await prisma.branchOffices.findUnique({ where: { id: updateBranchOfficeDto!.id } });
            if ( !branchOfficeExist ) return res.status(404).json({ error: 'Branch Office doesn´t exist' });

            // Verificar si la empresa existe
            const companyExist = await prisma.company.findUnique({ where: { id: updateBranchOfficeDto!.companyId } });
            if ( !companyExist ) return res.status(404).json({ error: 'Company doesn´t exist' });

            const updateBranchOffice = await prisma.branchOffices.update({
                where: { id: updateBranchOfficeDto!.id },
                data: updateBranchOfficeDto!.values
            });

            return res.status(201).json({ newBranchOffice: updateBranchOffice })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAllBranchesSources = async(req: Request, res: Response) => {

        const allBranchesOffices = await prisma.branchOffices.findMany({
            include: { company: true }
        });
        if ( allBranchesOffices.length == 0) return res.status(400).json({ error: 'there´s nothing to show' });

        return res.status(200).json({ branchesOffices: allBranchesOffices });
    }

    public deleteBranchOffice = async(req: Request, res: Response) => {

        try {

            const deleteAllBranchesOffices = await prisma.branchOffices.deleteMany();
            if ( deleteAllBranchesOffices.count === 0 ) return res.status(400).json({ error: 'There is nothing to remove' });

            return res.status(200).json({ message: 'All records was deleted successfully' });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public deleteOneBranchOffice = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            await prisma.branchOffices.delete({
                where: { id }
            });

            return res.status(200).json({ message: 'BranchOffice deleted successfully' });
        } catch (error: any) {
            console.log(error);
            if ( error.code === 'P2025' ) {
                return res.status(404).json({ error: error.meta.cause });
            }
            if ( error.code === 'P2003' ) {
                return res.status(404).json({ error: 'Cannot be deleted because the branch has dependencies' });
            }
            return res.status(500).json({ error });
        }

    }

}


