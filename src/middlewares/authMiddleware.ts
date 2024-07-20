import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../config';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token not provided' });

    try {
        const decoded = await JwtAdapter.validateToken(token);
        req.user = decoded; // Puedes adjuntar la información decodificada al objeto de la solicitud si lo deseas

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Not token valid' });
    }

}


