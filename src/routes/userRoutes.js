const express= require("express");
const router = express.Router();

const authMiddleware= require('../middleware/userMiddleware');
const emailMiddleware= require('../middleware/emailMiddleware');

const userController = require("../controllers/userController");


router.post("/", authMiddleware, emailMiddleware, userController.createNewUser);

router.get("/", userController.getAllActiveUsers );

router.patch("/", userController.changeCryptValue);

router.patch("/:email", userController.changeMoneyAndHealth );


module.exports= router;