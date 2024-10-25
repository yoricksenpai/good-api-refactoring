import { Collection, Document, Filter, UpdateFilter } from "mongodb";
import { getDatabase } from "../../database/mongodb";

export abstract class BaseRepository {
    protected abstract collectionName: string;
    
    protected async getCollection(): Promise<Collection> {
        const db = await getDatabase();
        return db.collection(this.collectionName);
    }

    async insertMany(documents: Document[]): Promise<Document[]> {
        const collection = await this.getCollection();
        // Faire l'insertion
        const result = await collection.insertMany(documents);
        
        // Récupérer tous les documents insérés en une seule requête
        const insertedIds = Object.values(result.insertedIds);
        const insertedDocuments = await collection.find({
            _id: { $in: insertedIds }
        }).toArray();
        
        // Retourner les documents dans le même ordre que l'insertion
        return insertedIds.map(id => 
            insertedDocuments.find(doc => doc._id.toString() === id.toString())!
        );
    }

    async findAll(params: { 
        filter?: Filter<Document>,
        projection?: Record<string, number>,
        sort?: Record<string, 1 | -1>,
        limit?: number,
        skip?: number 
    }) {
        const collection = await this.getCollection();
        let query = collection.find(params.filter || {});
        
        if (params.projection) query = query.project(params.projection);
        if (params.sort) query = query.sort(params.sort);
        if (params.limit) query = query.limit(params.limit);
        if (params.skip) query = query.skip(params.skip);
        
        return query.toArray();
    }

    async findOne(params: { filter: Filter<Document>, projection?: Record<string, number> }) {
        const collection = await this.getCollection();
        return collection.findOne(params.filter, { projection: params.projection });
    }

    async update(filter: Filter<Document>, update: UpdateFilter<Document>) {
        const collection = await this.getCollection();
        return collection.updateOne(filter, { $set: update });
    }

    async delete(filter: Filter<Document>) {
        const collection = await this.getCollection();
        return collection.deleteOne(filter);
    }

    async count(filter: Filter<Document>): Promise<number> {
        const collection = await this.getCollection();
        return collection.countDocuments(filter);
    }
}