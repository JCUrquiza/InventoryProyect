import { Request, Response } from 'express';
import { CreateCatalogueDto } from '../../domain';
import { prisma } from '../../data/postgres';


export class CatalogueController {

    constructor() {}


    public createCatalogue = async(req: Request, res: Response) => {

        try {

            const [error, createCatalogueDto] = CreateCatalogueDto.create(req.body);
            if ( error ) return res.status(400).json({ error });

            const catalogueExist = await prisma.catalogue.findFirst({
                where: {
                    name: createCatalogueDto!.name
                }
            });
            if ( catalogueExist ) return res.status(400).json({ error: 'That catalogue already exists' });

            const newCatalogue = await prisma.catalogue.create({
                data: createCatalogueDto!
            });
            
            return res.status(201).json({ newCatalogue });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }




    public getAll = async(req: Request, res: Response) => {
        const allConcepts = await prisma.catalogue.findMany();
        if ( allConcepts.length == 0 ) return res.status(400).json({ error: 'Nothing to show' });

        return res.status(200).json({ catalogue: allConcepts });
    }

    public deleteAll = async(req: Request, res: Response) => {

        try {

            const deleteCatalogues = await prisma.catalogue.deleteMany();
            if ( deleteCatalogues.count == 0 ) return res.status(400).json({ error: 'Nothing to delete' });

            return res.status(200).json({ message: 'All catalogues was deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



