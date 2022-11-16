const express= require("express");
const router = express.Router();

const dollController = require("../controllers/dollController");

router.post("/", dollController.createDollAndDollPiece);

router.get("/", dollController.getAllDollPieces );

module.exports= router;