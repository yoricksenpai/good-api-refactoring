import { Document, Filter, WithId } from "mongodb";

export interface ServiceInterface {
    /**
     * Create a new document
     * @throws {Error} errorMsg.ON_CREATION
     * @returns {Promise<QueryResult>} with respMsg.CREATED
     */
    create(data: Document): Promise<QueryResult>;

    /**
     * Find all documents matching the query
     * @throws {Error} errorMsg.NOT_FOUND
     */
    findAll(query?: QueryOptions): Promise<getAllResult>;

    /**
     * Find one document matching the query
     * @throws {Error} errorMsg.NOT_FOUND
     */
    findOne(query: QueryOptions): Promise<WithId<Document>>;

    /**
     * Count documents matching the query
     * @throws {Error} errorMsg.NOT_FOUND
     */
    count(filter: QueryFilter): Promise<number>;

    /**
     * Update documents matching the filter
     * @throws {Error} errorMsg.NOT_FOUND | errorMsg.ON_UPDATE
     * @returns {Promise<QueryResult>} with respMsg.UPDATED
     */
    update(filter: QueryFilter, data: Document): Promise<QueryResult>;

    /**
     * Delete a document matching the filter
     * @throws {Error} errorMsg.NOT_FOUND
     * @returns {Promise<QueryResult>} with respMsg.SUCCESS_OPERATION
     */
    delete(filter: QueryFilter): Promise<QueryResult>;
}

export type ObjectType<T> = {
    [key: string]: T;
}

export type QueryOptions = {
    filter?: QueryFilter;
    projection?: QueryProjection;
    limit?: number;
    offset?: number;
    sort?: string;
    way?: 1 | -1;
}

export type QueryFilter = ObjectType<unknown>;

export type QueryProjection = ObjectType<number>;

export type getAllResult = {
    data: WithId<Document>[];
    count: number;
}

export type QueryResult = {
    status: number;
    message: string;
    data?: unknown;
}

// Erreurs HTTP standards
export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
} as const;

// Helper pour construire les réponses
export const setResponse = (
    status: number, 
    message: string, 
    data?: unknown
): QueryResult => ({
    status,
    message,
    data
});