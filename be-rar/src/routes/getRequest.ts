import express from "express";
import getRequestController from "../controllers/getRequest";

const router = express.Router();

router.get("/", getRequestController);

export { router as getRequestRouter };
