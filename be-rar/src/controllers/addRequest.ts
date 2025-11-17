import { Request, Response } from "express";
import { addRequestSchema } from "../validators/requestValidator";
import { RequestData } from "../models/Request";
import { generatePDF } from "../utils/pdfGenerator";

const addRequestController = async (req: Request, res: Response) => {
  const {
    company,
    industry,
    contact,
    email,
    location,
    activity,
    hazards,
    timeframe,
  } = req.body;

  const { error } = addRequestSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => ({
        message: err.message,
      })),
    });
  }

  try {
    const requestData = new RequestData({
      company,
      industry,
      contact,
      email,
      location,
      activity,
      hazards,
      timeframe,
    });

    await requestData.save();

    const pdfBuffer = await generatePDF(req.body);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=confirmation.pdf",
      "Content-Length": pdfBuffer.length,
    });

    const pdfBase64 = pdfBuffer.toString("base64");

    res.status(201).json({
      message: "Request added successfully",
      formData: requestData,
      pdf: {
        filename: `${company}_confirmation.pdf`,
        contentType: "application/pdf",
        base64: pdfBase64,
      },
    });
  } catch (error) {
    console.error("Error in addRequestController:", error);
    res.status(500).json({
      message: "Failed to add request",
      error: (error as Error).message,
    });
  }
};

export default addRequestController;
