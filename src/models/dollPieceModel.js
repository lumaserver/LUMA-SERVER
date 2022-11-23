const mongoose = require("mongoose");

const { Schema } = mongoose;

const dollPieceSchema = new Schema({
  pieceName: String,
  image: String,
  isFound: { type: Boolean, default: false },
  coordinates: {
    latitude: { type: Double, default: null },
    longitude: { type: Double, default: null },
  },
});

module.exports = mongoose.model("DollPiece", dollPieceSchema);
