const mongoose = require("mongoose");
const { ACOLIT_AWAKE_STATUS } = require("../constants");

const { Schema } = mongoose;

const userSchema = new Schema({
  idToken: { type: String, required: true },
  idSocket: { type: String, default: null, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  isJoshua: { type: Boolean, default: false, required: true },
  isActive: { type: Boolean, default: true, required: true },
  isInside: { type: Boolean, default: false, required: true },
  health: { type: Number, min: 0, max: 100, default: 100, required: true },
  money: { type: Number, min: 0, max: 29, default: 29, required: true },
  acolitStatus: { type: String, default: ACOLIT_AWAKE_STATUS, required: true },
  resistance: { type: Number, min: 10, max: 100, default: 100, required: true },
  concentration: { type: Number, min: 10, max: 100, default: 100, required: true },
});

module.exports = mongoose.model("User", userSchema);


