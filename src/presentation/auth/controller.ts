import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';
import { prisma } from '../../data/postgres';


export class AuthController {

    constructor(
        public readonly authService: AuthService
    ) {}


    private handleError = (error: unknown, res: Response) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    public registerUser = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        this.authService.registerUser(registerUserDto!)
            .then( (user) => res.json(user) )
            .catch( error => this.handleError(error, res) );
    }


    public loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        this.authService.loginUser(loginUserDto!)
            .then( (user) => res.json(user) )
            .catch( error => this.handleError(error, res) )
    }


    public validateToken = (req: Request, res: Response) => {

        const token = req.headers.authorization?.split(' ')[1];
        if ( !token ) return res.status(400).json({ error: 'Token not provided' });

        this.authService.validateToken(token)
            .then( user => res.json( user ) )
            .catch( error => this.handleError(error, res) )

    }


    public deleteUsers = async(req: Request, res: Response) => {

        try {

            const users = await prisma.users.deleteMany();
            if ( users.count == 0 ) return res.status(400).json({ error: 'Nothing to delete' });
            
            return res.status(200).json({ message: 'Users was deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


}



