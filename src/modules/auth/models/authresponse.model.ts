import { LoginCredentials } from "./credentials.model";
import { User } from "../../users";
export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
}