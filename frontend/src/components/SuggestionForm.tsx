import React, { useState } from 'react';
import axios from 'axios';

const SuggestionForm: React.FC = () => {
  const [errorCode, setErrorCode] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/suggestions', {
        errorCode,
        suggestionText
      });
      setMessage(response.data.message);
      setErrorCode('');
      setSuggestionText('');
    } catch (error) {
      setMessage('Erro ao cadastrar sugestão.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Sugestões</h2>
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
          <label>Texto da Sugestão:</label>
          <textarea
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Sugestão</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SuggestionForm;
