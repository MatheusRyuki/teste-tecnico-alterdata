import { Router } from "express";
import { Suggestion } from "../models/Suggestion";

const router = Router();

// Rota para cadastro de sugestões
router.post("/suggestions", async (req, res) => {
  const { errorCode, suggestionText } = req.body;

  if (!errorCode || !suggestionText) {
    return res
      .status(400)
      .json({
        message: "Código de erro e texto da sugestão são obrigatórios.",
      });
  }

  try {
    const newSuggestion = new Suggestion({ errorCode, suggestionText });
    await newSuggestion.save();
    res.status(201).json({ message: "Sugestão cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar sugestão.", error });
  }
});

export default router;
