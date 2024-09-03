const bcrypt = require("bcryptjs/dist/bcrypt");
const UserCollection = require("../../models/userModel");
const mongoose = require("mongoose");
const postUserController = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      id,
      username,
      useremail,
      password,
      age,
      firstName,
      lastName,
      salary,
      city,
      gender,
      role,
      skills,
    } = req.body;
    if (!id) return res.status(400).json({ message: "Please provide id" });
    if (!username)
      return res.status(400).json({ message: "Please provide username" });
    if (!password)
      return res.status(400).json({ message: "Please provide password" });
    if (!useremail)
      return res.status(400).json({ message: "Please provide useremail" });
    if (!age) return res.status(400).json({ message: "Please provide age" });
    if (!role) return res.status(400).json({ message: "Please provide role" });
    if (!firstName)
      return res.status(400).json({ message: "Please provide firstName" });
    if (!lastName)
      return res.status(400).json({ message: "Please provide lastName" });
    if (!city) return res.status(400).json({ message: "Please provide city" });
    if (!gender)
      return res.status(400).json({ message: "Please provide gender" });
    if (!salary)
      return res.status(400).json({ message: "Please provide salary" });
    if (!skills)
      return res.status(400).json({ message: "Please provide skills" });

    // Check if the id or useremail is already taken
    const existingUserById = await UserCollection.findOne({ id });
    console.log(`existsbyid: ${existingUserById}`);
    if (existingUserById) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    const existinguser = await UserCollection.find({ useremail });
    console.log(`email already exits: ${existinguser}`);
    if (existinguser.length > 0) {
      return res.status(400).send({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new UserCollection({
      id,
      username,
      useremail,
      password: hashedPassword,
      age,
      firstName,
      lastName,
      salary,
      city,
      gender,
      role,
      skills,
    }).save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(`user is not added error occured: ${error}`.bgRed.white);
    res.send({
      status: false,
      message: "user is not added, Try Again!!!",
    });
  }
};
module.exports = postUserController;
