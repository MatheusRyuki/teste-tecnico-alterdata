import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const EvaluationForm: React.FC = () => {
  const [errorCode, setErrorCode] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [date, setDate] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    errorCode?: string;
    suggestionText?: string;
    date?: string;
    clientCode?: string;
    evaluation?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      errorCode?: string;
      suggestionText?: string;
      date?: string;
      clientCode?: string;
      evaluation?: string;
    } = {};
    if (!/^\d{6}$/.test(errorCode)) {
      newErrors.errorCode = "Código de erro deve conter exatamente 6 dígitos.";
    }
    if (suggestionText.trim().length === 0) {
      newErrors.suggestionText = "Sugestão de correção é obrigatória.";
    }
    if (!date) {
      newErrors.date = "Data é obrigatória.";
    }
    if (!/^\d{6}$/.test(clientCode)) {
      newErrors.clientCode =
        "Código do cliente deve conter exatamente 6 dígitos.";
    }
    if (!evaluation) {
      newErrors.evaluation = "Avaliação é obrigatória.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/evaluations",
        {
          errorCode,
          suggestionText,
          date,
          clientCode,
          evaluation,
        }
      );
      setMessage(response.data.message);
      setErrorCode("");
      setSuggestionText("");
      setDate("");
      setClientCode("");
      setEvaluation("");
    } catch (error) {
      setMessage("Erro ao cadastrar avaliação.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Cadastro de Avaliações
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Código de Erro"
            variant="outlined"
            fullWidth
            margin="normal"
            value={errorCode}
            onChange={(e) => setErrorCode(e.target.value)}
            required
            inputProps={{ maxLength: 6 }}
            error={!!errors.errorCode}
            helperText={errors.errorCode}
          />
          <TextField
            label="Sugestão de Correção"
            variant="outlined"
            fullWidth
            margin="normal"
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
            required
            error={!!errors.suggestionText}
            helperText={errors.suggestionText}
          />
          <TextField
            label="Data"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.date}
            helperText={errors.date}
          />
          <TextField
            label="Código do Cliente"
            variant="outlined"
            fullWidth
            margin="normal"
            value={clientCode}
            onChange={(e) => setClientCode(e.target.value)}
            required
            inputProps={{ maxLength: 6 }}
            error={!!errors.clientCode}
            helperText={errors.clientCode}
          />
          <FormControl fullWidth margin="normal" error={!!errors.evaluation}>
            <InputLabel>Avaliação</InputLabel>
            <Select
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
              required
            >
              <MenuItem value="positive">Positiva</MenuItem>
              <MenuItem value="negative">Negativa</MenuItem>
            </Select>
            {errors.evaluation && (
              <Typography variant="body2" color="error">
                {errors.evaluation}
              </Typography>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar Avaliação
          </Button>
        </form>
        {message && (
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default EvaluationForm;
