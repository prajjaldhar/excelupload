const csvParser = require("csv-parser");
const exModel = require("../../models/ExModel");
const { Readable } = require("stream");

const uploadexcelproductcontroller = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const csvData = [];

    // Convert buffer to a readable stream
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null); // End of stream

    const parser = csvParser();

    bufferStream
      .pipe(parser)
      .on("data", (data) => {
        // Log each row to check its contents
        console.log("Parsed row:", data);
        csvData.push(data);
      })
      .on("end", async () => {
        try {
          // Log the data being saved to MongoDB
          console.log("CSV data to save:", csvData);

          // Save CSV data to MongoDB using Mongoose
          await exModel.insertMany(csvData);

          console.log("CSV data saved to MongoDB successfully.");
          res.status(200).send("CSV file uploaded and processed successfully.");
        } catch (error) {
          console.error("Error saving CSV data to MongoDB:", error);
          res.status(504).send("Error saving CSV data to MongoDB.");
        }
      });
  } catch (error) {
    console.error("Error processing CSV:", error);
    res.status(504).send("Internal Server Error");
  }
};

module.exports = uploadexcelproductcontroller;
