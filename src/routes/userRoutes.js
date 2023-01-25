const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/userMiddleware");
const emailMiddleware = require("../middleware/emailMiddleware");
const jwtMiddleWare = require("../middleware/jwtAuthentication");
const userController = require("../controllers/userController");
const generateAccessToken = require("../utils/jwtGenerator");
const generateRefreshToken = require("../utils/jwtGenerator");

router.post("/", authMiddleware, emailMiddleware, generateAccessToken, generateRefreshToken, userController.createNewUser);

router.get("/", userController.getAllActiveUsers);

router.patch("/cript/:email", userController.changeCryptValue);

router.patch("/:email", userController.updateUser);

module.exports = router;
