import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    industry: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    activity: { type: String, required: true },
    hazards: { type: String },
    timeframe: { type: String },
  },
  { timestamps: true }
);

export const RequestData = mongoose.model("RequestData", requestSchema);
