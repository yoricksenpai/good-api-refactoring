import { NextFunction, Request, Response } from 'express';
import { ProductsService } from "./product.service";
import { Service, Inject } from "typedi";

@Service()
export class ProductController {
    constructor(  private readonly productService: ProductsService) {
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.productService.createProduct(req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.productService.getAllProducts();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.productService.getProductById(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.productService.updateProduct(req.params.id, req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.productService.deleteProduct(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}