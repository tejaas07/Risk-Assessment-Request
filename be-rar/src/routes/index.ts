import express from "express";
import { getRequestRouter } from "./getRequest";
import { addRequestRouter } from "./addRequest";

const router = express.Router();

router.use("/add", addRequestRouter);
router.use("/get", getRequestRouter);

export default router;
