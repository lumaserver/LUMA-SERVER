const express = require("express");
const router = express.Router();
const jwtMiddleWare = require("../middleware/jwtAuthentication");

const dataController = require("../controllers/dataController");

router.get("/:email", jwtMiddleWare, dataController.getAllData);

module.exports = router;