const { PDFDocument } = require("pdf-lib");
const sharp = require("sharp");
const path = require("path");

const convertImageToPdf = async (req, res) => {
  try {
    // Check if the file exists and its extension is an image
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const validExtensions = [".png", ".jpg", ".jpeg", ".gif"];
    if (!req.file || !validExtensions.includes(fileExtension)) {
      return res
        .status(400)
        .send("Please upload a valid image file (PNG, JPEG, JPG, GIF).");
    }

    // Extract the original file name without the extension
    const originalFileName = path.basename(
      req.file.originalname,
      fileExtension
    );

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Convert the image to a buffer using sharp and convert it to JPEG format for embedding
    const imageBuffer = await sharp(req.file.buffer).toBuffer();

    // Embed the image buffer into the PDF as JPEG format
    const image = await pdfDoc.embedJpg(imageBuffer); // Use embedJpg for all images
    const { width, height } = image;
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    });

    // Serialize the PDF document to bytes (buffer)
    const pdfBytes = await pdfDoc.save();

    // Set the response headers to serve the PDF as a downloadable file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${originalFileName}.pdf"`
    );

    // Send the PDF bytes as a downloadable file
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error converting image to PDF:", error);
    res.status(500).send("Error processing the file.");
  }
};

module.exports = convertImageToPdf;
