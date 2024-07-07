import { Request, Response } from 'express';
import { CreateCompanyDto } from '../../domain';
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

}

