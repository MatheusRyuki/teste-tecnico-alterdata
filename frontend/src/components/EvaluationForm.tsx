import React, { useState } from 'react';
import axios from 'axios';

const EvaluationForm: React.FC = () => {
  const [errorCode, setErrorCode] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [date, setDate] = useState('');
  const [clientCode, setClientCode] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/evaluations', {
        errorCode,
        suggestionText,
        date,
        clientCode,
        evaluation
      });
      setMessage(response.data.message);
      setErrorCode('');
      setSuggestionText('');
      setDate('');
      setClientCode('');
      setEvaluation('');
    } catch (error) {
      setMessage('Erro ao cadastrar avaliação.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Avaliações</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Código de Erro:</label>
          <input
            type="text"
            value={errorCode}
            onChange={(e) => setErrorCode(e.target.value)}
            required
            maxLength={6}
          />
        </div>
        <div>
          <label>Sugestão de Correção:</label>
          <input
            type="text"
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Código do Cliente:</label>
          <input
            type="text"
            value={clientCode}
            onChange={(e) => setClientCode(e.target.value)}
            required
            maxLength={6}
          />
        </div>
        <div>
          <label>Avaliação:</label>
          <select value={evaluation} onChange={(e) => setEvaluation(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="positive">Positiva</option>
            <option value="negative">Negativa</option>
          </select>
        </div>
        <button type="submit">Cadastrar Avaliação</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EvaluationForm;
