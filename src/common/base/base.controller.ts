import { NextFunction, Request, Response } from 'express';
import { controllerInterface } from '../interfaces';
import { BaseService } from './base.service';
import { logger } from "../../winston-config";
import { BaseModel } from '../interfaces/model.interface';
import { Service } from 'typedi';

// @Service()
export  class BaseController<T extends BaseModel> implements controllerInterface {

  protected logger;

  constructor(protected readonly service: BaseService) {
    this.logger = logger;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.create(req.body)); }
    catch (error) { next(error); }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.findAll({ filter: req.query })); }
    catch (error) { next(error); }
  }

  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.findOne({ filter: req.query })); }
    catch (error) { next(error); }
  }


  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.findOne(req.params)); }
    catch (error) { next(error); }
  }

  async count(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.count(req.query)); }
    catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.service.update(req.query, req.body)); }
    catch (error) { next(error); }
  }

}