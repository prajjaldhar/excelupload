const { PDFDocument, StandardFonts } = require("pdf-lib");
const mammoth = require("mammoth");
const path = require("path");

const convertDocxToPdf = async (req, res) => {
  try {
    // Check if the uploaded file is a DOCX
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (!req.file || fileExtension !== ".docx") {
      return res.status(400).send("Please upload a valid DOCX file.");
    }

    // Extract the original file name and replace the extension with .pdf
    const originalName = path.basename(req.file.originalname, ".docx");
    const pdfFileName = `${originalName}.pdf`;

    // Convert DOCX to plain text using mammoth
    const result = await mammoth.extractRawText({ buffer: req.file.buffer });
    const docxText = result.value; // Extracted plain text from DOCX

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Set the page size to A4 (595.28 x 841.89 points)
    const A4_WIDTH = 595.28;
    const A4_HEIGHT = 841.89;
    const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

    // Set default font size and margins
    const fontSize = 12;
    const margin = 50;

    // Add the text to the page
    const { height } = page.getSize();
    const text = docxText; // You can adjust this to break lines if needed

    // Optional: Set a standard font (you can customize this)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText(text, {
      x: margin,
      y: height - margin - fontSize,
      size: fontSize,
      maxWidth: A4_WIDTH - margin * 2, // Ensure text stays within page width
      font: font,
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Set the response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${pdfFileName}"`
    );

    // Send the PDF as a downloadable file
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error converting DOCX to PDF:", error);
    res.status(500).send("Error processing the file.");
  }
};

module.exports = convertDocxToPdf;
