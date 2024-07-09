import { Request, Response } from 'express';
import { CreateProductDto, UpdateProductDto } from '../../domain';
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

    public updateProduct = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateProductDto] = UpdateProductDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            // Verificar que el producto a modificar exista:
            const productExist = await prisma.products.findUnique({
                where: { id }
            });
            if ( !productExist ) return res.status(400).json({ error: 'Product doens´t exist' });

            const productUpdated = await prisma.products.update({
                where: { id: updateProductDto!.id },
                data: updateProductDto!.values
            });

            return res.status(200).json({ productUpdated });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAll = async(req: Request, res: Response) => {
        const allProducts = await prisma.products.findMany();
        if ( allProducts.length == 0) return res.status(400).json({ error: 'There´s nothing to show' });

        return res.status(200).json({ allProducts });
    }

    public deleteOne = async(req: Request, res: Response) => {

        const id = +req.params.id;

        // Buscamos si existe el producto
        const productFind = await prisma.products.findUnique({ where: {id} });
        if ( !productFind ) return res.status(404).json({ error: 'Product doesn´t exist' });

        const deleteProduct = await prisma.products.delete({ where: {id} });
        
        return res.status(200).json({ productDeleted: deleteProduct });
    }

}

