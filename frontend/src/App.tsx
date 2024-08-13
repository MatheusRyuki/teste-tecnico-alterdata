import React from 'react';
import SuggestionForm from './components/SuggestionForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sistema de Gerenciamento de Soluções de Erros</h1>
      <SuggestionForm />
    </div>
  );
};

export default App;
