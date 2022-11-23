const mongoose = require("mongoose");

const { Schema } = mongoose;

const dollPieceSchema = new Schema({
  pieceName: String,
  image: String,
  isFound: { type: Boolean, default: false },
  coordinates: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
});

module.exports = mongoose.model("DollPiece", dollPieceSchema);
