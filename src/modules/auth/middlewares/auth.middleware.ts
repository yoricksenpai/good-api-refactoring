import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthService } from '../auth.service';
import { User } from '../../users';

// Extension de l'interface Request pour inclure l'utilisateur
declare module 'express' {
    interface Request {
        user?: Omit<User, 'password'>;
    }
}

/**
 * Middleware d'authentification qui vérifie le token JWT
 * et attache l'utilisateur à la requête si le token est valide
 */
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ 
                success: false,
                message: 'No token provided' 
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ 
                success: false,
                message: 'Invalid token format' 
            });
            return;
        }

        const authService = Container.get(AuthService);
        const user = await authService.validateToken(token);
        
        if (!user) {
            res.status(401).json({ 
                success: false,
                message: 'Invalid or expired token' 
            });
            return;
        }

        // Attacher l'utilisateur à la requête
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};