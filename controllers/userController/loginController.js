const UserCollection = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// login callback
const loginController = async (req, res) => {
  try {
    const { useremail, password } = req.body;
    if (!password)
      return res.status(400).json({ message: "Please provide password" });
    if (!useremail)
      return res.status(400).json({ message: "Please provide useremail" });

    const user = await UserCollection.findOne({ useremail });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Error in Login CTRL ${error.message}`.bgRed.white });
  }
};
module.exports = loginController;
