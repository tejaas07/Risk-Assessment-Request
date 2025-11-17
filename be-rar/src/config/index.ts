import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 8085,
  mongoUrl: process.env.MONGO_URL as string,
};
