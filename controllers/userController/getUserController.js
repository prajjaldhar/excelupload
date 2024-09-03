const UserCollection = require("../../models/userModel");
const mongoose = require("mongoose");
const getUserController = async (req, res) => {
  try {
    const { id, firstname, lastname, username } = req.params;
    console.log(username);
    let users;
    // && mongoose.Types.ObjectId(id)
    if (id) {
      users = await UserCollection.find({ _id: id }).select("-password");
    } else if (firstname) {
      const searchfirstname = firstname.toLowerCase();
      users = await UserCollection.find({
        firstName: { $regex: new RegExp(searchfirstname, "i") },
      }).select("-password");
    } else if (lastname) {
      const searchlastname = lastname.toLowerCase();
      users = await UserCollection.find({
        lastName: { $regex: new RegExp(searchlastname, "i") },
      }).select("-password");
    } else if (username) {
      const searchname = username.toLowerCase();
      users = await UserCollection.find({
        username: { $regex: new RegExp(searchname, "i") },
      }).select("-password");
    } else if (req.path.includes("/random")) {
      users = await UserCollection.aggregate([{ $sample: { size: 5 } }]);
    } else {
      users = await UserCollection.find().select("-password");
    }
    if (!users || users.length == 0)
      return res.status(404).json({ message: "users not found" });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = getUserController;
