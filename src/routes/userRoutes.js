const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/userMiddleware");
const emailMiddleware = require("../middleware/emailMiddleware");
const jwtMiddleWare = require("../middleware/jwtAuthentication");
const userController = require("../controllers/userController");


router.post("/", authMiddleware, emailMiddleware, userController.createNewUser);

router.get("/", jwtMiddleWare, userController.getAllActiveUsers);

router.patch("/cript/:email", userController.changeCryptValue);

router.patch("/:email", userController.updateUser);

module.exports = router;
