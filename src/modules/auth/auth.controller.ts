// auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { AuthService } from "./auth.service";
import { Service, Inject } from "typedi";

@Service()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.login(req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.register(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.refresh(req.body.refreshToken);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({
                success: true,
                user: req.user
            });
        } catch (error) {
            next(error);
        }
    }
}
