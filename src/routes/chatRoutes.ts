import { Router, Request, Response } from "express";
import { sendMessageToChatbot, getChatHistory } from "../services/chat.service";

const router = Router();

// ✅ POST /chat → Envia uma mensagem
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "userId e message são obrigatórios" });
    }

    const reply = await sendMessageToChatbot(userId, message);
    res.json({ reply });
  } catch (err) {
    console.error("Erro no chat:", err);
    res.status(500).json({ error: "Erro ao processar mensagem" });
  }
});

// ✅ GET /chat/:userId → Busca o histórico do usuário
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const history = await getChatHistory(req.params.userId);
    res.json(history);
  } catch (err) {
    console.error("Erro ao buscar histórico:", err);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
});

export default router;
