import React from "react";
import SuggestionForm from "./components/SuggestionForm";
import Dashboard from "./components/Dashboard";
import FilterForm from "./components/FilterForm";
import EvaluationForm from "./components/EvaluationForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sistema de Gerenciamento de Soluções de Erros</h1>
      <SuggestionForm />
      <EvaluationForm />
      <Dashboard />
      <FilterForm />
    </div>
  );
};

export default App;
