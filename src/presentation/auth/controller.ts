import { Request, Response } from 'express';


export class AuthController {

    constructor() {}


    public registerUser = (req: Request, res: Response) => {

        res.json( 'registerUser' );
    }

    public loginUser = (req: Request, res: Response) => {

        res.json( 'loginUser' );
    }

    public validateToken = (req: Request, res: Response) => {
        
        res.json( 'validateToken' );
    }

}



