import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
const SECRET_KEY = process.env.SECRET; 
const ADMIN_SECRET = process.env.ADMIN_SECRET;
export interface TokenPayload {
    userId: string;
    email: string;
}
export function GenerateAdminToken(payload: TokenPayload, expiresIn: string|number = '7d'): string  {
    const token = jwt.sign(payload, ADMIN_SECRET, { expiresIn });
    return token;
}
export function GenerateUserToken(payload: TokenPayload, expiresIn: string|number = '7d'): string  {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    return token;
}