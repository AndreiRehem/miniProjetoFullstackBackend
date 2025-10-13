// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// 1. Defina a interface customizada para o Request
export interface AuthRequest extends Request {
    user?: { // Defina o que o token JWT injeta, ex: id e email
        id: string; 
        email: string;
    }; 
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    // ... lógica de token ...
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // ...
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." }); 
    }

    try {
        // Assegure que o JWT.verify retorne o tipo correto (payload)
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
        
        // 2. O TypeScript agora sabe que 'req.user' existe e tem o tipo correto.
        req.user = decoded; 
        
        next();
    } catch (err) {
        // ...
        return res.status(403).json({ message: "Token inválido ou expirado." }); 
    }
};