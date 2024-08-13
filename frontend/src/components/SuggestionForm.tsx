import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const SuggestionForm: React.FC = () => {
  const [errorCode, setErrorCode] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    errorCode?: string;
    suggestionText?: string;
  }>({});

  const validate = () => {
    const newErrors: { errorCode?: string; suggestionText?: string } = {};
    if (!/^\d{6}$/.test(errorCode)) {
      newErrors.errorCode = "Código de erro deve conter exatamente 6 dígitos.";
    }
    if (suggestionText.trim().length === 0) {
      newErrors.suggestionText = "Texto da sugestão é obrigatório.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/suggestions",
        {
          errorCode,
          suggestionText,
        }
      );
      setMessage(response.data.message);
      setErrorCode("");
      setSuggestionText("");
    } catch (error) {
      setMessage("Erro ao cadastrar sugestão.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Cadastro de Sugestões
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
            label="Texto da Sugestão"
            variant="outlined"
            fullWidth
            margin="normal"
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
            required
            multiline
            rows={4}
            error={!!errors.suggestionText}
            helperText={errors.suggestionText}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar Sugestão
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

export default SuggestionForm;
