import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware'; // <--- Importe aqui!

// GET /protected
// Use AuthRequest em vez de Request
export const protectedRoute = (req: AuthRequest, res: Response) => {

    const userId = req.user!.id; 
    
    console.log(`LOG: Acesso autorizado à rota protegida para o usuário ID: ${userId}`);

    return res.status(200).json({
        message: "Acesso autorizado! Você está vendo uma rota protegida.",
        user: req.user 
    });
};