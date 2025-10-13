import User, { IUser } from '../models/users';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não está definida nas variáveis de ambiente!");
}

export const registerUser = async (userData: any): Promise<IUser> => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("Email já cadastrado."); 
    }

    const newUser = new User(userData);
    await newUser.save();

    console.log(`LOG: Novo usuário registrado: ${newUser.email}`);
    return newUser;
};

// 2. Serviço de Login
export const loginUser = async (email: string, password: string): Promise<{ token: string, user: IUser }> => {
    // 1. Busca o usuário (incluindo a senha)
    const user = await User.findOne({ email }).select('+password');

    // 2. Verifica se o usuário existe
    if (!user) {
        throw new Error("Credenciais inválidas.");
    }

    // 3. Compara a senha (usando o método do Model)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Credenciais inválidas.");
    }

    // 4. Gera o Token JWT
    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    console.log(`LOG: Usuário logado e token gerado: ${user.email}`);

    const userWithoutPassword = await User.findOne({ email });

    return { token, user: userWithoutPassword as IUser };
};