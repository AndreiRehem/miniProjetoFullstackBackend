import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config(); 

const connectDB = async (): Promise<void> => {
    const uri = process.env.NODE_ENV === 'production'
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI;

    if (!uri) {
        console.error("ERRO: Variável de ambiente MONGO_URI ou MONGO_URI_PROD não está definida.");
        process.exit(1); // Encerra o processo se a URI não for encontrada
    }

    try {
        await mongoose.connect(uri);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        // Usa `error as Error` para acessar a propriedade message
        console.error(`ERRO ao conectar ao MongoDB: ${(error as Error).message}`);
        process.exit(1); // Encerra o processo em caso de falha na conexão
    }
};

export default connectDB;