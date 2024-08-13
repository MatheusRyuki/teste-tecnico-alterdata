import { Schema, model } from "mongoose";

const suggestionSchema = new Schema({
  errorCode: { type: String, required: true, length: 6 },
  suggestionText: { type: String, required: true },
});

export const Suggestion = model("Suggestion", suggestionSchema);
