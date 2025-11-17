import express from "express";
import { json } from "body-parser";
import Routes from "./routes";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json({ limit: "10kb" }));

app.set("trust proxy", true);

app.use("/apis", Routes);

app.get("/show", (req, res) => res.send("API Running ✅"));

export default app;
