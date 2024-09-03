const UserCollection = require("../../models/userModel");
const mongoose = require("mongoose");

const deleteUserController = async (req, res) => {
  try {
    const { id, firstname, lastname, username } = req.params;
    let user;
    console.log(username);

    if (id) {
      user = await UserCollection.findOne({ _id: id }).select("-password");
    } else if (firstname) {
      const searchfirstname = firstname.toLowerCase();
      user = await UserCollection.findOne({
        firstName: { $regex: new RegExp(`^${searchfirstname}$`, "i") },
      });
    } else if (lastname) {
      const searchlastname = lastname.toLowerCase();
      user = await UserCollection.findOne({
        lastName: { $regex: new RegExp(`^${searchlastname}$`, "i") },
      });
    } else if (username) {
      const searchname = username.trim().toLowerCase();
      user = await UserCollection.findOne({
        username: { $regex: new RegExp(`^${searchname}`, "i") },
      });
    }

    // If no user is found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the deleted user
    console.log("Deleted User: ", user);

    // Delete the specific user
    await UserCollection.deleteOne({ _id: user._id });

    // Send the deleted user info in response
    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteUserController;
