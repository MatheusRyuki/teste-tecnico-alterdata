import { Schema, model } from "mongoose";

const evaluationSchema = new Schema({
  errorCode: { type: String, required: true, length: 6 },
  suggestionText: { type: String, required: true },
  date: { type: Date, required: true },
  clientCode: { type: String, required: true, length: 6 },
  evaluation: { type: String, required: true, enum: ["positive", "negative"] },
});

export const Evaluation = model("Evaluation", evaluationSchema);
