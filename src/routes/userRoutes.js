const express= require("express");
const router = express.Router();

const authMiddleware= require('../middleware/userMiddleware');
const emailMiddleware = require('../middleware/emailMiddleware');
const jwtMiddleWare = require('../middleware/jwtAuthentication');

const userController = require("../controllers/userController");


router.post("/", authMiddleware, emailMiddleware, jwtMiddleWare, userController.createNewUser);

router.get("/", userController.getAllActiveUsers );

router.patch("/cript/:email", userController.changeCryptValue);

router.patch("/:email", userController.updateUser );


module.exports= router;