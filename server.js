const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const excelproductRoute = require("./routes/excelproductRoute");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const app = express();

app.use(morgan("dev"));
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Express login api",
  });
  console.log("Hello World");
});

app.use("/user", userRoute);
app.use("/excelproduct", excelproductRoute);
app.use("/excelproduct", excelproductRoute);

const PORT = process.env.PORT || 7000 || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
