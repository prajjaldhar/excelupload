const express = require("express");
const getUserController = require("../controllers/userController/getUserController");
const postUserController = require("../controllers/userController/postUserController");
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../helpers/authController");
const loginController = require("../controllers/userController/loginController");
const deleteUserController = require("../controllers/userController/deleteUserController");
const updateUserController = require("../controllers/userController/updateUserController");
const router = express.Router();
router.get("/", getUserController);
router.get("/id/:id", getUserController);
router.get("/name/:username", getUserController);
router.get("/lastname/:lastname", getUserController);
router.get("/firstname/:firstname", getUserController);
router.get("/random", getUserController);
router.post("/register", postUserController);
//LOGIN || POST
router.post("/login", loginController);
//Auth || POST
router.post("/getuserdata", authMiddleware, authController);
router.delete("/delete/id/:id", deleteUserController);
router.delete("/delete/firstname/:firstname", deleteUserController);
router.delete("/delete/lastname/:lastname", deleteUserController);
router.delete("/delete/name/:username", deleteUserController);
router.put("/update/id/:id", updateUserController);

module.exports = router;
