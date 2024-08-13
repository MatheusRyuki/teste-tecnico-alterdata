import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Evaluation {
  suggestion: string;
  average: number;
}

const Dashboard: React.FC = () => {
  const [averageTotal, setAverageTotal] = useState<number | null>(null);
  const [averageBySuggestion, setAverageBySuggestion] = useState<Evaluation[]>([]);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/evaluations/average');
        setAverageTotal(response.data.averageTotal);
        setAverageBySuggestion(response.data.averageBySuggestion);
      } catch (error) {
        console.error('Erro ao obter avaliações:', error);
      }
    };

    fetchAverages();

    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (event) => {
      const newEvaluation = JSON.parse(event.data);
      console.log('Nova avaliação recebida:', newEvaluation);
      fetchAverages(); // Atualizar as médias quando uma nova avaliação for recebida
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Dashboard de Avaliações</h2>
      <div>
        <h3>Avaliação Média Total: {averageTotal !== null ? `${averageTotal.toFixed(2)}%` : 'Carregando...'}</h3>
      </div>
      <div>
        <h3>Avaliação Média por Sugestão:</h3>
        <ul>
          {averageBySuggestion.map((evaluation, index) => (
            <li key={index}>
              {evaluation.suggestion}: {evaluation.average.toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
