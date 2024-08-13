import React, { useState } from "react";
import axios from "axios";

interface Evaluation {
  errorCode: string;
  suggestionText: string;
  date: string;
  clientCode: string;
  evaluation: string;
}

const FilterForm: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/api/evaluations",
        {
          params: { startDate, endDate },
        }
      );
      setEvaluations(response.data);
    } catch (error) {
      console.error("Erro ao obter avaliações:", error);
    }
  };

  return (
    <div>
      <h2>Filtrar Avaliações por Período</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Fim:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Filtrar</button>
      </form>
      <div>
        <h3>Resultados:</h3>
        <ul>
          {evaluations.map((evaluation, index) => (
            <li key={index}>
              {evaluation.date}: {evaluation.suggestionText} -{" "}
              {evaluation.evaluation} (Cliente: {evaluation.clientCode})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterForm;
