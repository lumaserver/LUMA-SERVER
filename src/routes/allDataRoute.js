const express= require("express");
const router = express.Router();

const allDataController = require("../controllers/dataController");

router.get("/", allDataController.getAllData );

module.exports= router;