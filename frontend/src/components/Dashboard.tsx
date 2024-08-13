import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useSnackbar } from "notistack";

interface Evaluation {
  suggestion: string;
  average: number;
}

const Dashboard: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [averageTotal, setAverageTotal] = useState<number | null>(null);
  const [averageBySuggestion, setAverageBySuggestion] = useState<Evaluation[]>(
    []
  );

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/evaluations/average"
        );
        setAverageTotal(response.data.averageTotal);
        setAverageBySuggestion(response.data.averageBySuggestion);
      } catch (error) {
        console.error("Erro ao obter avaliações:", error);
      }
    };

    fetchAverages();

    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const newEvaluation = JSON.parse(event.data);
      const message = `Nova avaliação recebida:
        Código de Erro: ${newEvaluation.errorCode}
        Sugestão: ${newEvaluation.suggestionText}
        Data: ${new Date(newEvaluation.date).toLocaleDateString()}
        Cliente: ${newEvaluation.clientCode}
        Avaliação: ${
          newEvaluation.evaluation === "positive" ? "Positiva" : "Negativa"
        }`;
      enqueueSnackbar(message, { variant: "info" });
      fetchAverages(); // Atualizar as médias quando uma nova avaliação for recebida
    };

    return () => {
      ws.close();
    };
  }, [enqueueSnackbar]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Dashboard de Avaliações
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Avaliação Média Total:{" "}
          {averageTotal !== null
            ? `${averageTotal.toFixed(2)}%`
            : "Carregando..."}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Avaliação Média por Sugestão:
        </Typography>
        <List>
          {averageBySuggestion.map((evaluation, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${
                  evaluation.suggestion
                }: ${evaluation.average.toFixed(2)}%`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;
