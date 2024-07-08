import { Request, Response } from 'express';
import { CreateProductFamilyDto, UpdateProductFamilyDto } from '../../domain';
import { prisma } from '../../data/postgres';


export class ProductFamilyController {

    constructor() {}

    public createProductFamily = async(req: Request, res: Response) => {

        try {

            const [error, createProductFamilyDto] = CreateProductFamilyDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            // Verificar que ese nombre de familia no exista:
            const productFamilyExist = await prisma.productFamily.findFirst({
                where: {
                    name: createProductFamilyDto!.name
                }
            });
            if ( productFamilyExist ) return res.status(400).json({ error: `${createProductFamilyDto!.name} already exist` });

            const saveProductFamily = await prisma.productFamily.create({
                data: createProductFamilyDto!
            });
            
            return res.status(201).json({ productFamily: saveProductFamily });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public updateProductFamily = async(req: Request, res: Response) => {

        try {

            const id = +req.params.id;
            const [error, updateProductFamilyDto] = UpdateProductFamilyDto.create({...req.body, id});
            if ( error ) return res.status(400).json({ error });

            // Verificar si la familia producto existe
            const productFamilyExist = await prisma.productFamily.findUnique({ where: {id} });
            if ( !productFamilyExist ) return res.status(400).json({ error: 'That product family doesn´t exist' });

            const updateProductFamily = await prisma.productFamily.update({
                where: {id},
                data: updateProductFamilyDto!.values
            });
            
            return res.status(200).json({ productFamilyUpdated: updateProductFamily });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

    public getAll = async(req: Request, res: Response) => {
        const allProductFamily = await prisma.productFamily.findMany();
        if ( allProductFamily.length == 0) return res.status(400).json({ error: 'There´s nothing to show' });

        return res.status(200).json({ productFamilies: allProductFamily });
    }

    public deleteOne = async(req: Request, res: Response) => {

        const id = +req.params.id;

        // Buscamos si existe la familia del producto
        const productFamilyExist = await prisma.productFamily.findUnique({ where: { id } });
        if ( !productFamilyExist ) return res.status(404).json({ error: 'Product family doesn´t exist' });

        const productFamilyDeleted = await prisma.productFamily.delete({ where: {id} });
        
        return res.status(200).json({ message: `Product Family deleted: ${productFamilyDeleted.name}` });
    }

}


