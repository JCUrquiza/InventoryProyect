import { bcryptAdapter, JwtAdapter } from '../../config';
import { prisma } from '../../data/postgres';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';


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
            
            // Encriptar la contraseña
            const hashedPassword = bcryptAdapter.hash(registerUserDto.password);
            
            const user = await prisma.users.create({
                data: {
                    ...registerUserDto,
                    password: hashedPassword
                }
            });
            
            // Generar JWT

            return {
                user,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }


    public async loginUser( loginUserDto: LoginUserDto ) {

        // Verificar que el usuario exista por correo
        const userExist = await prisma.users.findFirst({
            where: {
                email: loginUserDto.email
            }
        });
        if ( !userExist ) throw CustomError.notFound('User doesn´t exist');

        // isMatch: bcrypt.compare('123456', $2443#jetkj3k4j)
        const isMatching = bcryptAdapter.compare(loginUserDto.password, userExist.password);
        if ( !isMatching ) throw CustomError.unauthorized('User not valid');

        // Save on token
        const token = await JwtAdapter.generateToken({ id: userExist.id });
        if ( !token ) throw CustomError.internalServer('Error while creating jwt');

        const {password, ...rest} = userExist;

        // Retornar la info deo usuario
        return {
            user: rest,
            token
        };        

    }

    public async validateToken(token: string) {

        try {
            const decoded = await JwtAdapter.validateToken(token);
            if ( !decoded ) throw CustomError.unauthorized('Invalid token');

            const userExist = await prisma.users.findFirst({
                where: {
                    id: decoded.id
                }
            });
            if ( !userExist ) throw CustomError.notFound('User doesnt exist');
            
            const { password, ...rest } = userExist;
            
            const response = {
                user: rest,
                token
            };

            return response;
        } catch (error) {
            console.log(error);
            throw CustomError.unauthorized(`${error}`);
        }

    }

}


