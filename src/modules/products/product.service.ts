// ProductsService.ts
import { Service } from "typedi";
import { Document } from 'mongodb';
import { logger } from '../../winston-config';
import { ProductsRepository } from "./product.repository";

@Service()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async createProduct(data: Document): Promise<Document> {
        try {
            return await this.productsRepository.createProduct(data);
        } catch (error) {
            logger.error('Failed to create product:', error);
            throw error;
        }
    }

    async getAllProducts(): Promise<Document[]> {
        try {
            return await this.productsRepository.getAllProducts();
        } catch (error) {
            logger.error('Failed to get all products:', error);
            throw error;
        }
    }

    async getProductById(id: string): Promise<Document | null> {
        try {
            return await this.productsRepository.getProductById(id);
        } catch (error) {
            logger.error(`Failed to get product by id ${id}:`, error);
            throw error;
        }
    }

    async updateProduct(id: string, data: Document): Promise<boolean> {
        try {
            return await this.productsRepository.updateProductById(id, data);
        } catch (error) {
            logger.error(`Failed to update product ${id}:`, error);
            throw error;
        }
    }

    async deleteProduct(id: string): Promise<boolean> {
        try {
            return await this.productsRepository.deleteProductById(id);
        } catch (error) {
            logger.error(`Failed to delete product ${id}:`, error);
            throw error;
        }
    }
}