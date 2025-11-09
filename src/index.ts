import express, { Application } from "express";
import * as dotenv from "dotenv";
import connectDB from "./database/configdb";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import cors from "cors";

// 1️⃣ Carrega o arquivo .env
dotenv.config();


// 2️⃣ Define ambiente e variáveis conforme o modo
const isProduction = process.env.NODE_ENV === "production";

const MONGO_URI = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_LOCAL;

const MONGO_DB_NAME = isProduction
  ? process.env.MONGO_DB_NAME_PROD
  : process.env.MONGO_DB_NAME_LOCAL;

const PORT = process.env.PORT || 3001;

// 3️⃣ Loga o ambiente e a URI (sem expor senha)
console.log("===============================================");
console.log(`✅ Ambiente: ${isProduction ? "Produção" : "Desenvolvimento"}`);
console.log(`🌍 Conectando ao MongoDB: ${MONGO_URI}`);
console.log(`📦 Banco em uso: ${MONGO_DB_NAME}`);
console.log("===============================================");

// 4️⃣ Inicializa o app Express
const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mini-projeto-fullstack-frontend-p4ijbm88d-andreirehems-projects.vercel.app",
      "https://mini-projeto-fullstack-frontend.vercel.app",
      "https://frontendmongo.andreirehem.dev"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
// 5️⃣ Middlewares globais
app.use(express.json());

// 6️⃣ Rotas
app.use("/", authRoutes);
app.use("/chat", chatRoutes); // ✅ Rota principal do chatbot

// 7️⃣ Conecta ao MongoDB
connectDB(MONGO_URI!, MONGO_DB_NAME!);

// 8️⃣ Sobe o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

