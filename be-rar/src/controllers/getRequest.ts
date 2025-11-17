import { Request, Response } from "express";
import { RequestData } from "../models/Request";

const getRequestController = async (req: Request, res: Response) => {
  try {
    const requestData = await RequestData.find();
    res.status(201).json({
      message: "Request added successfully",
      data: requestData,
    });
  } catch (error) {
    console.error("Error in addRequestController:", error);
    res.status(500).json({
      message: "Failed to add request",
      error: error,
    });
  }
};

export default getRequestController;
