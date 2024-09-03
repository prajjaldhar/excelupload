const UserCollection = require("../../models/userModel");

const updateUserController = async (req, res) => {
  try {
    const { id, username, firstname, lastname } = req.params;
    const updateData = req.body; // Contains the fields to update

    let user;

    if (id) {
      user = await UserCollection.findById(id);
    } else if (firstname) {
      const searchfirstname = firstname.toLowerCase();
      user = await UserCollection.findOne({
        firstName: { $regex: new RegExp(searchfirstname, "i") },
      });
    } else if (lastname) {
      const searchlastname = lastname.toLowerCase();
      user = await UserCollection.findOne({
        lastName: { $regex: new RegExp(searchlastname, "i") },
      });
    } else if (username) {
      const searchname = username.toLowerCase();
      user = await UserCollection.findOne({
        username: { $regex: new RegExp(searchname, "i") },
      });
    } else {
      return res.status(400).json({ message: "No identifier provided" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with the provided fields in req.body
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined && updateData[key] !== null) {
        user[key] = updateData[key];
      }
    });

    // Save the updated user data
    await user.save();

    // Re-fetch the updated user and exclude the password
    const updatedUser = await UserCollection.findById(user._id).select(
      "-password"
    );

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUserController;
