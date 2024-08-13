import { Router } from "express";
import { Suggestion } from "../models/Suggestion";

const router = Router();

// Rota para cadastro de sugestões
router.post("/suggestions", async (req, res) => {
  const { errorCode, suggestionText } = req.body;

  if (!errorCode || !suggestionText) {
    return res.status(400).json({
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

// Rota para consulta de sugestões
router.get("/suggestions/:errorCode", async (req, res) => {
  const { errorCode } = req.params;

  try {
    const suggestions = await Suggestion.find({ errorCode });
    if (suggestions.length === 0) {
      return res
        .status(404)
        .json({
          message: "Nenhuma sugestão encontrada para este código de erro.",
        });
    }
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao consultar sugestões.", error });
  }
});

export default router;
