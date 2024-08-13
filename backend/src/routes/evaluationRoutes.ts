import { Router } from "express";
import { Evaluation } from "../models/Evaluation";

const router = Router();

// Rota para cadastro de avaliações
router.post("/evaluations", async (req, res) => {
  const { errorCode, suggestionText, date, clientCode, evaluation } = req.body;

  if (!errorCode || !suggestionText || !date || !clientCode || !evaluation) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const newEvaluation = new Evaluation({
      errorCode,
      suggestionText,
      date,
      clientCode,
      evaluation,
    });
    await newEvaluation.save();
    res.status(201).json({ message: "Avaliação cadastrada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar avaliação.", error });
  }
});

export default router;
