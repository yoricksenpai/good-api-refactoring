// auth/auth.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthController } from './auth.controller';
import { authenticate, requireRoles } from './middlewares';
import { User, UserRole } from '../users';

const router = Router();
const authController = Container.get(AuthController);

// Wrapper pour les gestionnaires de route asynchrones
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };


router.post('/login', asyncHandler((req, res, next) => authController.login(req, res, next)));
router.post('/register', asyncHandler((req, res, next) => authController.register(req, res, next)));
router.post('/refresh-token', asyncHandler((req, res, next) => authController.refreshToken(req, res, next)));
// Route protégée pour obtenir le profil utilisateur
router.get(
    '/me', 
    authenticate,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        await authController.getMe(req, res, next);
    })
);

// Route protégée avec rôle administrateur
router.get(
    '/admin-only',
    authenticate,
    requireRoles([UserRole.ADMIN]),
    (req: Request, res: Response) => {
        res.json({ message: "Welcome admin!" });
    }
);
export default router;
