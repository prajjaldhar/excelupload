const { PDFDocument } = require("pdf-lib");
const QRCode = require("qrcode");
const { Readable } = require("stream");

const convertLinkToPdf = async (req, res) => {
  try {
    const { url } = req.body; // Assuming the URL is sent in the request body

    if (!url) {
      return res.status(400).send("Please provide a URL.");
    }

    // Generate QR code from URL
    const qrCodeBuffer = await QRCode.toBuffer(url);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add the QR code image to the PDF
    const qrImage = await pdfDoc.embedPng(qrCodeBuffer);
    const { width, height } = qrImage;
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(qrImage, {
      x: 0,
      y: 0,
      width,
      height,
    });

    // Serialize the PDF document to bytes (buffer)
    const pdfBytes = await pdfDoc.save();

    // Set the response headers to serve the PDF as a downloadable file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="QRCode.pdf"`);

    // Send the PDF bytes as a downloadable file
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating QR code and PDF:", error);
    res.status(500).send("Error processing the file.");
  }
};

module.exports = convertLinkToPdf;
