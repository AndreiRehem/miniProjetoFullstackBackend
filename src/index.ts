import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database/configdb';
import authRoutes from './routes/authRoutes';

dotenv.config(); // 1. Carrega variáveis de ambiente

const app: Application = express();
const PORT = process.env.PORT || 3000;

// 2. Conexão com o Banco de Dados
connectDB();

// 3. Middlewares Globais
app.use(express.json()); // Permite que o Express leia JSON do corpo da requisição

// 4. Rotas
app.use('/', authRoutes);

// 5. Inicia o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});