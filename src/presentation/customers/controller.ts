import { Request, Response } from 'express';
import { CreateTypeCustomerDto } from '../../domain/dtos/customers/create-type-customer.dto';
import { prisma } from '../../data/postgres';


export class CustomerController {

    public createTypeUser = async(req: Request, res: Response) => {

        try {
            
            const [error, createTypeCustomerDto] = CreateTypeCustomerDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            const typeCustomerExist = await prisma.typeCustomer.findFirst({
                where: {
                    name: createTypeCustomerDto!.name
                }
            });
            if ( typeCustomerExist ) return res.status(400).json({ error: 'typeCustomer already exists' });

            const newTypeCustomer = await prisma.typeCustomer.create({
                data: createTypeCustomerDto!
            });

            return res.status(201).json({ newTypeCustomer });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAllTypeCustomers = async(req: Request, res: Response) => {

        const getAllTypeCustomers = await prisma.typeCustomer.findMany();
        if ( getAllTypeCustomers.length == 0 ) return res.status(400).json({ error: 'typeCustomers are empty' });

        return res.status(200).json({ typeCustomers: getAllTypeCustomers });
    }

    public createCustomer = async(req: Request, res: Response) => {

        try {
            
            

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAllCustomers = async(req: Request, res: Response) => {

        try {

            const getAllCustomers = await prisma.customers.findMany();
            if ( getAllCustomers.length == 0 ) return res.status(400).json({ error: 'There are no clients to show' });

            return res.status(200).json({ customers: getAllCustomers });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}


