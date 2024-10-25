import { NextFunction, Request, Response } from 'express';
import { UsersService } from "./user.service";
import { Service } from "typedi";
import { QueryOptions } from '../../common/interfaces';
import { errorMsg } from "../../common";

@Service()
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.usersService.createUser(req.body);
            res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const queryOptions: QueryOptions = {
                filter: req.query as Record<string, unknown>
            };
            const result = await this.usersService.findOne(queryOptions);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new Error(errorMsg.res.idNotProvided);
            }
            const result = await this.usersService.getUserById(id);
            if (!result) {
                throw new Error(errorMsg.NOT_FOUND);
            }
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!id) {
                throw new Error(errorMsg.res.idNotProvided);
            }
            const result = await this.usersService.updateUser(id, req.body);
            res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
}