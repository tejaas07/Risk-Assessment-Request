import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";
import { connectDB } from "./database/db";
import { config } from "./config";

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
  });
};

startServer();
