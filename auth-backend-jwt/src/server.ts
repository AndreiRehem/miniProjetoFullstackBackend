// src/server.ts
import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database/connections';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware padrão
app.use(express.json()); 

connectDB();

// Rotas
app.use('/', routes);

// Middleware de tratamento de erros deve ser o último
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});