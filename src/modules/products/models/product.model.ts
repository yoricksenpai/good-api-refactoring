import { ObjectId } from "mongodb";

export interface products{
    _id: ObjectId;
    name: string;
    description: string;
    quantity: number;
    appreciation: number;
    brand: string;
    tags: string[];
    category: string;
    price: number;
    sku:string;
    isAvailable: boolean;
}