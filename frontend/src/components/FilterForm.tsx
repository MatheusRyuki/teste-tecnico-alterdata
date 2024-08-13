import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Filtrar Avaliações por Período
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Data de Início"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Data de Fim"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Filtrar
          </Button>
        </form>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Resultados:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Código do Cliente</TableCell>
                <TableCell>Avaliação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluations.map((evaluation, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(evaluation.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{evaluation.clientCode}</TableCell>
                  <TableCell>{evaluation.evaluation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default FilterForm;
