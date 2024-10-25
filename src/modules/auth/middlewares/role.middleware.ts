import { Request, Response, NextFunction, } from 'express';
import { Container } from 'typedi';
import { AuthService } from '../auth.service';
import { User } from '../../users';

// Extension de l'interface Request pour inclure l'utilisateur
declare module 'express' {
    interface Request {
        user?: Omit<User, 'password'>;
    }
}



// Middleware pour vérifier les rôles
export const requireRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ 
                success: false,
                message: 'User not authenticated' 
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ 
                success: false,
                message: 'Insufficient permissions' 
            });
            return;
        }

        next();
    };
}