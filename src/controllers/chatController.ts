import { Request, Response } from "express";
import { sendMessageToChatbot, getChatHistory } from "../services/chat.service";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    const responseText = await sendMessageToChatbot(userId, message);
    res.status(200).json({ reply: responseText });
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    res.status(500).json({ error: "Erro ao processar a mensagem." });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const history = await getChatHistory(userId);
    res.status(200).json(history);
  } catch (err) {
    console.error("Erro ao buscar histórico:", err);
    res.status(500).json({ error: "Erro ao buscar histórico." });
  }
};
