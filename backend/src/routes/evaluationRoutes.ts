import { Router } from 'express';
import { Evaluation } from '../models/Evaluation';

const router = Router();

// Rota para cadastro de avaliações
router.post('/evaluations', async (req, res) => {
  const { errorCode, suggestionText, date, clientCode, evaluation } = req.body;

  if (!errorCode || !suggestionText || !date || !clientCode || !evaluation) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const newEvaluation = new Evaluation({ errorCode, suggestionText, date, clientCode, evaluation });
    await newEvaluation.save();
    res.status(201).json({ message: 'Avaliação cadastrada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar avaliação.', error });
  }
});

// Rota para obter avaliações e calcular médias
router.get('/evaluations/average', async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'Nenhuma avaliação encontrada.' });
    }

    const totalEvaluations = evaluations.length;
    const positiveEvaluations = evaluations.filter(e => e.evaluation === 'positive').length;
    const averageTotal = (positiveEvaluations / totalEvaluations) * 100;

    const suggestions = evaluations.reduce((acc, curr) => {
      if (!acc[curr.suggestionText]) {
        acc[curr.suggestionText] = { total: 0, positive: 0 };
      }
      acc[curr.suggestionText].total += 1;
      if (curr.evaluation === 'positive') {
        acc[curr.suggestionText].positive += 1;
      }
      return acc;
    }, {});

    const averageBySuggestion = Object.keys(suggestions).map(suggestion => ({
      suggestion,
      average: (suggestions[suggestion].positive / suggestions[suggestion].total) * 100
    }));

    res.status(200).json({ averageTotal, averageBySuggestion });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter avaliações.', error });
  }
});

export default router;
