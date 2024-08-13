import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import suggestionRoutes from "./routes/suggestionRoutes";
import evaluationRoutes from "./routes/evaluationRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose
  .connect(
    "mongodb+srv://dbUser:DJFszmCY4Wpr2oC8@cluster0.wz70saz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB Atlas", err);
  });

// Rotas
app.use("/api", suggestionRoutes);
app.use("/api", evaluationRoutes);

export default app;
