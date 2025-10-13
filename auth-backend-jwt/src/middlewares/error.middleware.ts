// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`ERRO: ${err.message}`);
    // Se o erro já tem um status, usa ele. Senão, usa 500 (Internal Server Error)
    const status = err.status || 500; 
    const message = err.message || 'Erro interno do servidor.';
    
    res.status(status).json({
        message: message,
        // Em produção, evite enviar a pilha de erros completa
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};