const express = require("express");
const router = express.Router();
const jwtAccessMiddleWare = require("../middleware/jwtAuthentication");

const dataController = require("../controllers/dataController");


router.get("/:email", jwtAccessMiddleWare, dataController.getAllData);

module.exports = router;