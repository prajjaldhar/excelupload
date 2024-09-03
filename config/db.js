const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.yellow.underline);
  } catch (error) {
    console.error(`error occured while connecting ${error}`.bgRed.white);
  }
};
module.exports = connectDB;
