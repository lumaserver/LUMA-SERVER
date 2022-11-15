const express= require("express");
const router = express.Router();

const dollController = require("../controllers/dollController");

router.get("/", dollController.getAllDollParts );

module.exports= router;