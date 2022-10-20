const express= require("express");
const router = express.Router();
const authMiddleware= require('../middleware/userMiddleware');
const userController = require("../controllers/userController");

router.post("/", authMiddleware, userController.createNewUser);
//router.patch("/:userId", userController.updateOneUser);

module.exports= router;