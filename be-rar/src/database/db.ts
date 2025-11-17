import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(config.mongoUrl);
      console.log("✅ MongoDB Connected");
      return;
    } catch (error) {
      console.log(`❌ MongoDB Connection Failed. Retries left: ${retries - 1}`);
      retries--;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  process.exit(1);
};
