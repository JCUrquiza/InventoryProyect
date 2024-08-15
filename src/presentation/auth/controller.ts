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

    public createPositionUser = async(req: Request, res: Response) => {

        try {
            
            const namePosition = req.body.name;
            if ( !namePosition ) return res.status(400).json({ error: 'Missing name of position' });
            
            const positionExist = await prisma.position.findFirst({
                where: {
                    name: namePosition
                }
            });
            if ( positionExist ) return res.status(400).json({ error: 'This position already exists, please try with other' });
            
            const newPosition = await prisma.position.create({
                data: {
                    name: namePosition  
                }
            });

            return res.status(201).json({ position: newPosition });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

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
            .catch( error => this.handleError(error, res) );
    }

    public validateToken = (req: Request, res: Response) => {

        const token = req.headers.authorization?.split(' ')[1];
        if ( !token ) return res.status(400).json({ error: 'Token not provided' });

        this.authService.validateToken(token)
            .then( user => res.json( user ) )
            .catch( error => this.handleError(error, res) );
    }

    public getAllUsers = async(req: Request, res: Response) => {

        try {

            const getAllUsers = await prisma.users.findMany();
            if ( getAllUsers.length == 0 ) return res.status(404).json({ error: 'users table is empty' });
            
            return res.status(200).json({ users: getAllUsers });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

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


