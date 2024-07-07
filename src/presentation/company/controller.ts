import { Request, Response } from 'express';
import { CreateCompanyDto, UpdateCompanyDto } from '../../domain';
import { prisma } from '../../data/postgres';


export class CompanyController {

    constructor() {}

    public createCompany = async(req: Request, res: Response) => {

        try {

            const [error, createCompanyDto] = CreateCompanyDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Buscamos si la sucursal para ingresar ya existe
            const companyExist = await prisma.company.findFirst({
                where: {
                    name: createCompanyDto!.name
                }
            });
            if ( companyExist ) return res.status(400).json({ error: 'Company already exist' });

            const createCompany = await prisma.company.create({
                data: createCompanyDto!
            });

            return res.status(201).json({ company: createCompany });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error })
        }

    }

    public updateCompany = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateCompanyDto] = UpdateCompanyDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            // Buscamos la compañía
            const companyExist = await prisma.company.findFirst({
                where: {
                    id: updateCompanyDto!.id
                }
            });
            if ( !companyExist ) return res.status(400).json({ error: 'Company doesn´t exists' });

            const companyUpdate = await prisma.company.update({
                where: { id: updateCompanyDto!.id  },
                data: updateCompanyDto!.values
            });
            
            return res.json( companyUpdate );
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAllCompanies = async(req: Request, res: Response) => {

        const allCompanies = await prisma.company.findMany();
        if ( allCompanies.length == 0) return res.status(400).json({ error: 'There´s nothing to show' });

        return res.status(200).json({ company: allCompanies });

    }

}

