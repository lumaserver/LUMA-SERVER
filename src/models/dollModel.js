const mongoose = require("mongoose");

const { Schema } = mongoose;

const dollSchema = new Schema({
  missionStatus: { type: String, default: 'missionStarted' },
  bodyPart: [{ type: Schema.ObjectId, ref: "DollPiece" }],
});

module.exports = mongoose.model("Doll", dollSchema);