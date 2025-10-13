import { loginUser,registerUser } from "../services/auth.service";
import { Request, Response, NextFunction } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
        }

        const newUser = await registerUser({ name, email, password });
        return res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });

    } catch (error: any) {
        // Tratamento de erro específico do serviço (ex: email duplicado)
        if (error.message === "Email já cadastrado.") {
            return res.status(409).json({ message: error.message });
        }
        // Outros erros (ex: erro de DB)
        next(error); 
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        const { token, user } = await loginUser(email, password);
        
        return res.status(200).json({
            message: "Login bem-sucedido.",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error: any) {
        // Tratamento de erro específico do serviço (ex: credenciais inválidas)
        if (error.message === "Credenciais inválidas.") {
            return res.status(401).json({ message: error.message });
        }
        next(error);
    }
};