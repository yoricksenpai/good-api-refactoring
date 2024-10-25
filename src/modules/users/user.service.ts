import { Service } from "typedi";
import { Document } from 'mongodb';
import { UsersRepository } from "./user.repository";
import { hash } from "bcrypt";
import { config } from "../../convict-config";
import { BaseService } from "../../common";
import { QueryFilter, QueryOptions, QueryResult } from "../../common/interfaces";
import { errorMsg } from "../../common";
import { ObjectId } from "mongodb";

@Service()
export class UsersService extends BaseService {
    constructor(private readonly usersRepository: UsersRepository) {
        super(usersRepository);
    }

    async createUser(userData: Document): Promise<QueryResult> {
        try {
            console.log('CreateUser received:', {
                email: userData.email,
                passwordLength: userData.password?.length
            });
            
            const existing = await this.usersRepository.findOne({ 
                filter: { email: userData.email } 
            });
            
            if (existing) {
                throw new Error(errorMsg.ACCOUNT_EXISTE);
            }

            // Log les salt rounds utilisés
            console.log('Salt rounds from config:', config.get('saltRounds'));

            // Ne pas modifier le mot de passe avant le hash
            const hashedPassword = await hash(userData.password, config.get('saltRounds'));
            console.log('Generated hash length:', hashedPassword.length);

            const userToCreate = {
                ...userData,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            return this.create(userToCreate);
        } catch (error) {
            console.error('CreateUser error:', error);
            throw error;
        }
    }


    // Méthode spécifique pour la vérification sûre d'un utilisateur
    async checkUserExists(email: string): Promise<boolean> {
        try {
            const user = await this.usersRepository.findOne({ 
                filter: { email } 
            });
            return !!user;
        } catch (error) {
            return false;
        }
    }

    async findOne(query: QueryOptions): Promise<Document & { _id: ObjectId }> {
        return super.findOne(query);
    }

    async getUserById(id: string): Promise<Document | null> {
        try {
            return await this.usersRepository.getUserById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, userData: Document): Promise<QueryResult> {
        try {
            const filter: QueryFilter = { _id: id };
            return this.update(filter, userData);
        } catch (error) {
            throw error;
        }
    }
}