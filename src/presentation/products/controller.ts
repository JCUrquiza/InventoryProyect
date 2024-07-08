import { Request, Response } from 'express';
import { CreateProductDto } from '../../domain';
import { prisma } from '../../data/postgres';


export class ProductsController {

    constructor() {}

    public createProduct = async(req: Request, res: Response) => {

        try {

            const [error, createProductDto] = CreateProductDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Verificar que el producto no exista previamente
            const productExist = await prisma.products.findFirst({
                where: { name: createProductDto!.name }
            });
            if ( productExist ) return res.status(400).json({ 'error': 'Product already exist' });

            const newProduct = await prisma.products.create({
                data: createProductDto!
            });
            
            return res.status(201).json({ product: newProduct });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}

