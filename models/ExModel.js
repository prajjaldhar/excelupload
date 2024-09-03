const mongoose = require("mongoose");

const ExSchema = new mongoose.Schema({
  "Index": { type: Number },
  "Customer Id": { type: String },
  "First Name": { type: String },
  "Last Name": { type: String },
  "Company	City": { type: String },
  "Country": { type: String },
  "Phone 1": { type: String },
  "Phone 2": { type: String },
  "Email": { type: String },
  "Subscription": { type: String },
  "Date": { type: String },
  "Website": { type: String },
});

const ExProductsCollection = mongoose.model("exproducts", ExSchema);
module.exports = ExProductsCollection;
