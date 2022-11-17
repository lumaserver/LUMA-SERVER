const express= require("express");
const router = express.Router();

const dollController = require("../controllers/dollController");

router.post("/", dollController.createDollAndDollPiece);

router.get("/", dollController.getAllDollPieces );

router.patch("/", dollController.updateMissionStatus );

router.patch("/dollPieces/:pieceName", dollController.updateDollPiece );


router.delete("/", dollController.deleteDollAndDollPieces );

module.exports= router;