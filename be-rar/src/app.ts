import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";
import logger from "./util/logger";
import { connectDB } from "./database/db";
import { config } from "./config";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB(); // Ensure DB is connected before starting the server
  app.listen(config.port, () => {
    logger.info(`🚀 Server running on port ${config.port}`);
  });
};

startServer();
