import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const uri = isProduction
        ? process.env.MONGODB_URI_PROD
        : process.env.MONGODB_URI_LOCAL;

    if (!uri) {
        console.error("ERRO: URI do MongoDB não definida!");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("Falha na conexão com MongoDB:", error);
        process.exit(1);
    }

    mongoose.connect('mongodb://admin:senha123@localhost:27017/', {
    authSource: 'admin'
    })
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.error('Erro ao conectar:', err));
};

export default connectDB;