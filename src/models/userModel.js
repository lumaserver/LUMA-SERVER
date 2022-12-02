const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  idToken: String,
  idSocket: String,
  name: String,
  email: String,
  isJoshua: Boolean,
  isActive: Boolean,
  picture: String,
  isInside: Boolean,
  health: Number,
  money: Number,
  acolitStatus: String,
  resistance: Number,
  concentration: Number
});

module.exports = mongoose.model("User", userSchema);


