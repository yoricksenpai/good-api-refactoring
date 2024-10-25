import { Document, Filter, WithId } from 'mongodb';
import { Service } from 'typedi';
import { logger } from "../../winston-config";
import { BaseRepository } from './base.repository';
import { 
    ServiceInterface, 
    QueryFilter, 
    QueryOptions, 
    QueryResult, 
    getAllResult,
    setResponse 
} from '../interfaces';
import { errorMsg, respMsg } from '../';

@Service()
export abstract class BaseService implements ServiceInterface {
    protected logger;
    
    constructor(protected readonly repository: BaseRepository) {
        this.logger = logger;
    }

    async create(data: Document): Promise<QueryResult> {
      try {
          if (!data || typeof data !== 'object') {
              throw new Error('Invalid data format');
          }

          // S'assurer que les dates sont bien des objets Date
          const documentToInsert = {
              ...data,
              createdAt: new Date(),
              updatedAt: new Date()
          };

          const result = await this.repository.insertMany([documentToInsert]);
          
          if (!result?.length) {
              throw new Error(errorMsg.ON_CREATION);
          }

          return setResponse(200, respMsg.CREATED, result[0]);
      } catch (error) {
          this.logger.error('Error in create:', error);
          if (error instanceof Error) {
              throw error;
          }
          throw new Error(errorMsg.ON_CREATION);
      }
  }

    async findAll(query?: QueryOptions): Promise<getAllResult> {
        try {
            const params = {
                filter: query?.filter || {},
                projection: query?.projection,
                sort: query?.sort ? { [query.sort]: query.way || 1 } : undefined,
                limit: query?.limit,
                skip: query?.offset
            };

            const data = await this.repository.findAll(params);
            
            if (!data?.length) {
                throw new Error(errorMsg.NOT_FOUND);
            }

            const count = await this.count(params.filter);

            return { data, count };
        } catch (error) {
            this.logger.error('Error in findAll:', error);
            if (error instanceof Error && error.message === errorMsg.NOT_FOUND) {
                throw error;
            }
            throw new Error(errorMsg[500]);
        }
    }

    async findOne(query: QueryOptions): Promise<WithId<Document>> {
        try {
            const params = {
                filter: query?.filter || {},
                projection: query?.projection
            };

            const document = await this.repository.findOne(params);
            console.log("Found document:", document);
                        
            if (!document) {
                throw new Error(errorMsg.NOT_FOUND);
            }

            return document;
        } catch (error) {
            this.logger.error('Error in findOne:', error);
            if (error instanceof Error && error.message === errorMsg.NOT_FOUND) {
                throw error;
            }
            throw new Error(errorMsg[500]);
        }
    }

    async count(filter: QueryFilter): Promise<number> {
        try {
            const count = await this.repository.count(filter);
            
            if (count === 0) {
                throw new Error(errorMsg.NOT_FOUND);
            }

            return count;
        } catch (error) {
            this.logger.error('Error in count:', error);
            if (error instanceof Error && error.message === errorMsg.NOT_FOUND) {
                throw error;
            }
            throw new Error(errorMsg[500]);
        }
    }

    async update(filter: QueryFilter, data: Document): Promise<QueryResult> {
        try {
            const existingDoc = await this.repository.findOne({ filter });
            if (!existingDoc) {
                throw new Error(errorMsg.NOT_FOUND);
            }

            const result = await this.repository.update(filter, data);
            if (!result.acknowledged) {
                throw new Error(errorMsg.ON_UPDATE);
            }

            return setResponse(200, respMsg.UPDATED);
        } catch (error) {
            this.logger.error('Error in update:', error);
            if (error instanceof Error && [errorMsg.NOT_FOUND, errorMsg.ON_UPDATE].includes(error.message)) {
                throw error;
            }
            throw new Error(errorMsg[500]);
        }
    }

    async delete(filter: QueryFilter): Promise<QueryResult> {
        try {
            const existingDoc = await this.repository.findOne({ filter });
            if (!existingDoc) {
                throw new Error(errorMsg.NOT_FOUND);
            }

            const result = await this.repository.delete(filter);
            if (!result.acknowledged) {
                throw new Error(errorMsg[500]);
            }

            return setResponse(200, respMsg.SUCCESS_OPERATION);
        } catch (error) {
            this.logger.error('Error in delete:', error);
            if (error instanceof Error && error.message === errorMsg.NOT_FOUND) { // Vérification du type d'erreur
                throw error;
            }
            throw new Error(errorMsg[500]);
        }
    }
}
