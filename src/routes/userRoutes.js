const express= require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/", userController.createNewUser);
//router.patch("/:userId", userController.updateOneUser);

module.exports= router;