// ProductsRepository.ts
import { BaseRepository } from "../../common";
import { Service } from "typedi";
import { Document, ObjectId } from "mongodb";
import { products } from "./models/product.model";

@Service()
export class ProductsRepository extends BaseRepository {
    protected collectionName: string = 'products';

    async createProduct(product: Document): Promise<Document> {
        const [insertedProduct] = await this.insertMany([product]);
        return insertedProduct;
    }

    async getAllProducts(): Promise<Document[]> {
        return this.findAll({});
    }

    async getProductById(id: string): Promise<Document | null> {
        return this.findOne({ filter: { _id: new ObjectId(id) } });
    }

    async updateProductById(id: string, product: Document): Promise<boolean> {
        const result = await this.update(
            { _id: new ObjectId(id) },
            product
        );
        return result.modifiedCount > 0;
    }

    async deleteProductById(id: string): Promise<boolean> {
        const result = await this.delete({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
}