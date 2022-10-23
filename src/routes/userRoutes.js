const express= require("express");
const router = express.Router();

const authMiddleware= require('../middleware/userMiddleware');
const userController = require("../controllers/userController");

router.post("/", authMiddleware, userController.createNewUser);

module.exports= router;