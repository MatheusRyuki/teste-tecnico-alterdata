import { Router } from 'express';
import { Evaluation } from '../models/Evaluation';
import { wss } from '../server';

const router = Router();

interface SuggestionStats {
  total: number;
  positive: number;
}

// Rota para cadastro de avaliações
router.post('/evaluations', async (req, res) => {
  const { errorCode, suggestionText, date, clientCode, evaluation } = req.body;

  if (!/^\d{6}$/.test(errorCode)) {
    return res.status(400).json({ message: 'Código de erro deve conter exatamente 6 dígitos.' });
  }
  if (!suggestionText || suggestionText.trim().length === 0) {
    return res.status(400).json({ message: 'Sugestão de correção é obrigatória.' });
  }
  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ message: 'Data inválida.' });
  }
  if (!/^\d{6}$/.test(clientCode)) {
    return res.status(400).json({ message: 'Código do cliente deve conter exatamente 6 dígitos.' });
  }
  if (!['positive', 'negative'].includes(evaluation)) {
    return res.status(400).json({ message: 'Avaliação deve ser "positive" ou "negative".' });
  }

  try {
    const newEvaluation = new Evaluation({ errorCode, suggestionText, date, clientCode, evaluation });
    await newEvaluation.save();

    // Enviar atualização para todos os clientes conectados via WebSocket
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(newEvaluation));
      }
    });

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

    const suggestions: { [key: string]: SuggestionStats } = {};
    evaluations.forEach(curr => {
      if (!suggestions[curr.suggestionText]) {
        suggestions[curr.suggestionText] = { total: 0, positive: 0 };
      }
      suggestions[curr.suggestionText].total += 1;
      if (curr.evaluation === 'positive') {
        suggestions[curr.suggestionText].positive += 1;
      }
    });

    const averageBySuggestion = Object.keys(suggestions).map(suggestion => ({
      suggestion,
      average: (suggestions[suggestion].positive / suggestions[suggestion].total) * 100
    }));

    res.status(200).json({ averageTotal, averageBySuggestion });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter avaliações.', error });
  }
});

// Rota para obter avaliações por período
router.get('/evaluations', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
  }

  try {
    const evaluations = await Evaluation.find({
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      }
    });

    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter avaliações por período.', error });
  }
});

export default router;
