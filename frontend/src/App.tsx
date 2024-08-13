import React from "react";
import "./App.css";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import SuggestionForm from "./components/SuggestionForm";
import EvaluationForm from "./components/EvaluationForm";
import Dashboard from "./components/Dashboard";
import FilterForm from "./components/FilterForm";

const App: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gerenciamento de Soluções de Erros
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SuggestionForm />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <EvaluationForm />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Dashboard />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <FilterForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Sistema de Gerenciamento de Soluções de Erros
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Desenvolvido por Matheus Ryuki
        </Typography>
      </Box>
    </SnackbarProvider>
  );
};

export default App;
