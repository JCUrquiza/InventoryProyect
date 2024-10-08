import { Request, Response } from 'express';
import { CreateTypeCustomerDto } from '../../domain/dtos/customers/create-type-customer.dto';
import { prisma } from '../../data/postgres';
import { CreateCustomerDto } from '../../domain/dtos/customers/create-customer.dto';
import { UpdateCustomerDto } from '../../domain/dtos/customers/update-customer.dto';


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
            
            const statusPendiente = await prisma.status.findFirst({
                where: {
                    code: 'Penrev'
                }
            });
            const statusId = statusPendiente!.id;

            const [error, createCustomerDto] = CreateCustomerDto.create({...req.body, statusId});
            if ( error ) return res.status(400).json({ error });

            const findCustomer = await prisma.customers.findFirst({
                where: {
                    name: createCustomerDto!.name,
                    apellidoPaterno: createCustomerDto!.apellidoPaterno,
                    apellidoMaterno: createCustomerDto!.apellidoMaterno
                }
            });
            if ( findCustomer ) return res.status(400).json({ error: 'This client already exists' });

            const newCustomer = await prisma.customers.create({
                data: createCustomerDto!,
                include: {
                    typeCustomer: true,
                    branchOffice: true,
                    status: true
                }
            });

            const result = {
                id: newCustomer.id,
                name: newCustomer.name,
                apellidoPaterno: newCustomer.apellidoPaterno,
                apellidoMaterno: newCustomer.apellidoMaterno,
                email: newCustomer.email,
                address: newCustomer.address,
                telephone: newCustomer.telephone,
                typeCustomer: newCustomer.typeCustomer,
                branchOffice: newCustomer.branchOffice,
                status: newCustomer.status
            };
            
            return res.status(201).json({ customer: result });
        } catch (error: any) {
            console.log(error);
            if ( error.code == 'P2003' ) {
                return res.status(500).json({ error: error.meta.field_name });
            }
            return res.status(500).json({ error });
        }

    }

    public updateCustomer = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            const [error, updateCustomerDto] = UpdateCustomerDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            const updateCustomer = await prisma.customers.update({
                where: {
                    id: updateCustomerDto!.id
                },
                data: updateCustomerDto!.values,
                include: {
                    typeCustomer: true,
                    branchOffice: true,
                    status: true
                }
            });

            const response = {
                id: updateCustomer.id,
                name: updateCustomer.name,
                fistName: updateCustomer.apellidoPaterno,
                lastName: updateCustomer.apellidoMaterno,
                email: updateCustomer.email,
                address: updateCustomer.address,
                typeCustomer: updateCustomer.typeCustomer,
                branchOffice: updateCustomer.branchOffice,
                status: updateCustomer.status,
            }

            return res.status(200).json({ updateCustomer: response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAllCustomers = async(req: Request, res: Response) => {

        try {

            const getAllCustomers = await prisma.customers.findMany({
                include: {
                    typeCustomer: true,
                    branchOffice: true,
                    status: true
                }
            });
            if ( getAllCustomers.length == 0 ) return res.status(400).json({ error: 'There are no clients to show' });

            const result = getAllCustomers.map( customer => ({
                id: customer.id,
                name: customer.name,
                sureName: customer.apellidoPaterno,
                secondSureName: customer.apellidoMaterno,
                email: customer.email,
                address: customer.address,
                telephone: customer.telephone,
                typeCustomer: customer.typeCustomer,
                branchOffice: customer.branchOffice,
                status: customer.status
            }));

            return res.status(200).json({ customers: result });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getCustomerDetails = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if ( !id ) return res.status(400).json({ error: 'Missing id' });
            
            const customerDetail = await prisma.customers.findUnique({
                where: {
                    id
                },
                include: {
                    typeCustomer: true,
                    branchOffice: true,
                    status: true
                }
            });
            if ( !customerDetail ) return res.status(404).json({ error: 'Customer doesnt found' });

            const response = {
                id: customerDetail.id,
                name: customerDetail.name,
                sureName: customerDetail.apellidoPaterno,
                secondSureName: customerDetail.apellidoMaterno,
                email: customerDetail.email,
                address: customerDetail.address,
                telephone: customerDetail.telephone,
                typeCustomer: customerDetail.typeCustomer,
                branchOffice: customerDetail.branchOffice,
                status: customerDetail.status,
            }

            return res.status(200).json({ customer: response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateStatusOfCustomer = async(req: Request, res: Response) => {

        try {

            const statusId = +req.body.statusId;
            const customerId = +req.body.customerId;

            if ( !statusId ) return res.status(400).json({ error: 'Missing statusId' });
            if ( !customerId ) return res.status(400).json({ error: 'Missing customerId' });

            const status = await prisma.status.findUnique({
                where: {
                    id: statusId
                }
            });
            if ( !status ) return res.status(400).json({ error: 'Status doesnt exist' });
            
            const customer = await prisma.customers.findUnique({
                where: {
                    id: customerId
                }
            });
            if ( !customer ) return res.status(500).json({ error: 'Customer doesnt exist' });

            await prisma.customers.update({
                where: {
                    id: customer.id
                },
                data: {
                    statusId : status.id
                }
            });
            
            return res.status(200).json({ message: 'Customer updated' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



