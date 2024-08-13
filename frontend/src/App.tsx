import React from 'react';
import SuggestionForm from './components/SuggestionForm';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sistema de Gerenciamento de Soluções de Erros</h1>
      <SuggestionForm />
      <Dashboard />
    </div>
  );
};

export default App;
