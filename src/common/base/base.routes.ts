import 'reflect-metadata';
import express, { Router, RequestHandler } from 'express';
import { BaseController } from './base.controller';
import { BaseModel } from '..';
import { Service } from 'typedi';
import { ProductController } from '../../modules/products/product.controller';

@Service()
export abstract class BaseRouter {
    // Déclarer le controller comme protected et initialisé via le constructeur
    constructor(
        protected readonly controller: ProductController
    ) {}

    getRouter = (middleware?: any) => {
        const router = express.Router();

        router.get('/', middleware, this.controller.getAllProducts);

        router.post('/', middleware, this.controller.createProduct);

        router.get('/:id', middleware, this.controller.getProductById);

        router.get('/one', middleware, this.controller.getProductById);

        router.put('/:id', middleware, this.controller.updateProduct);

        router.post('/count', middleware, this.controller.getProductById);

        return router;
    }
}