import PDFDocument from "pdfkit";

export const generatePDF = async (
  data: Record<string, any>
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      doc
        .fontSize(18)
        .text("Risk Assessment Request Confirmation", { align: "center" });
      doc.moveDown();

      Object.entries(data).forEach(([key, value]) => {
        doc.fontSize(12).text(`${key}: ${value || "N/A"}`);
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
