import express from "express";
import addRequestController from "../controllers/addRequest";
const router = express.Router();

router.post("/", addRequestController);

export { router as addRequestRouter };
