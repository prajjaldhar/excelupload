const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: "String",
    unique: true,
    required: [true, "please provide id"],
  },
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

const UserCollection = mongoose.model("users", userSchema);
module.exports = UserCollection;
