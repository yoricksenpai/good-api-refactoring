import { UserRole } from "./role.model";
import { BaseModel } from "../../../common";
export interface User extends BaseModel{
    id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}