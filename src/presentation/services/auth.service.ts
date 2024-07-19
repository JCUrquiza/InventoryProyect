import { prisma } from '../../data/postgres';
import { CustomError, RegisterUserDto } from '../../domain';


export class AuthService {

    // D.I.
    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto ) {

        const existUser = await prisma.users.findFirst({
            where: {
                email: registerUserDto.email
            }
        });
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        try {
            const user = await prisma.users.create({
                data: registerUserDto
            });

            // Encriptar la contraseña

            // Generar JWT

            return {
                user,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

}


