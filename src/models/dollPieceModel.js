const mongoose = require("mongoose");

const { Schema } = mongoose;

const dollPieceSchema = new Schema({
  pieceName: String,
  image: String,
  isFound: { type: Boolean, default: false },
  coordinates: {
    latitude: { type: mongoose.Types.Decimal128, default: null },
    longitude: { type: mongoose.Types.Decimal128, default: null },
  },
});

module.exports = mongoose.model("DollPiece", dollPieceSchema);
