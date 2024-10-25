import { User, UserRole } from "../users";
import { Service, Inject } from "typedi";
import { UsersService } from "../users";
import { Token } from "./models/token.model";
import { sign, verify } from 'jsonwebtoken';
import { LoginCredentials } from "./models";
import bcrypt from 'bcrypt';
import { config } from '../../convict-config';
import { errorMsg } from "../../common/utils";
import { isEmpty } from "lodash";
import * as helper from './helpers';
import { WithId, Document } from 'mongodb';


type UserDocument = WithId<Document> & User;

@Service()
export class AuthService {
    constructor( private readonly userService: UsersService) {}

    async login(credentials: LoginCredentials): Promise<any> {
        try {
            const { email, password } = credentials;
    
            console.log('Login attempt:', { 
                email,
                passwordLength: password?.length 
            });
    
            const user = await this.userService.findOne({ 
                filter: { email } 
            }) as UserDocument;
    
            console.log('User found:', !!user);
    
            if (!user || user instanceof Error) { 
                throw new Error(errorMsg.BAD_CREDENTIAL); 
            }
    
            console.log('Stored hash length:', user.password.length);
            
            const pwdOk = await bcrypt.compare(password, user.password);
            console.log('Password comparison result:', pwdOk);
    
            if (!pwdOk) { 
                throw new Error(errorMsg.BAD_CREDENTIAL); 
            }

            const tokenData = { 
                id: user._id.toString(),
                email: user.email,
                role: user.role
            };
            
            const token = helper.create(tokenData);

            // On retire le mot de passe avant de renvoyer l'utilisateur
            const { password: _password, ...userWithoutPassword } = user;

            return { 
                token: token.access_token,
                refreshToken: token.refresh_token,
                user: {
                    id: user._id.toString(),
                    ...userWithoutPassword
                }
            };
        } catch (error: any) {
            throw error;
        }
    }

    async register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<any> {
        try {
            if (!userData || !userData.email || !userData.password) {
                throw new Error('Email and password are required');
            }
    
            if (typeof userData.password !== 'string' || userData.password.trim() === '') {
                throw new Error('Invalid password format');
            }
    
            const userExists = await this.userService.checkUserExists(userData.email);
            if (userExists) {
                throw new Error('Email already exists');
            }
    
            // On passe le mot de passe non hashé, UsersService s'occupera du hash
            const newUser: Omit<User, 'id'> = {
                email: userData.email,
                password: userData.password, // Password non hashé
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                role: userData.role || UserRole.USER,
                createdAt: new Date(),
                updatedAt: new Date()
            };
    
            const result = await this.userService.createUser(newUser as User);
            if (result instanceof Error) {
                throw result;
            }
    
            if (!result.data || typeof result.data !== 'object') {
                throw new Error('User creation failed');
            }
    
            const createdUser = await this.userService.findOne({ 
                filter: { _id: (result.data as any)._id } 
            }) as UserDocument;
    
            const tokenData = {
                id: createdUser._id.toString(),
                email: createdUser.email,
                role: createdUser.role
            };
    
            const token = helper.create(tokenData);
    
            const { password: _password, ...userWithoutPassword } = createdUser;
    
            return {
                token: token.access_token,
                refreshToken: token.refresh_token,
                user: {
                    id: createdUser._id.toString(),
                    ...userWithoutPassword
                }
            };
        } catch (error: any) {
            console.error('Register error:', error);
            throw error;
        }
    }

    async refresh(refreshToken: string): Promise<any> {
        try {
            const payload: any = verify(refreshToken, config.get('tokenSalt'));
            
            const user = await this.userService.findOne({ 
                filter: { _id: payload.payload.id } 
            }) as UserDocument;

            if (!user || user instanceof Error) {
                throw new Error(errorMsg.INVALID_TOKEN);
            }
            
            const newToken = helper.refresh(refreshToken);

            const { password: _password, ...userWithoutPassword } = user;

            return {
                token: newToken,
                refreshToken,
                user: {
                    id: user._id.toString(),
                    ...userWithoutPassword
                }
            };
        } catch (error: any) {
            throw error;
        }
    }

    async validateToken(token: string): Promise<Omit<User, 'password'> | null> {
        try {
            const payload: any = verify(token, config.get('tokenSalt'));
            
            const user = await this.userService.findOne({ 
                filter: { _id: payload.payload.id } 
            }) as UserDocument;

            if (!user || user instanceof Error) {
                return null;
            }

            const { password: _password, ...userWithoutPassword } = user;
            return {
                id: user._id.toString(),
                ...userWithoutPassword
            };
        } catch (error) {
            return null;
        }
    }
}