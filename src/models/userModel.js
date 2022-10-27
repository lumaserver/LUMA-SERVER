const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  idToken: String,
  name: String,
  email: String,
  isJoshua: Boolean,
  isActive: Boolean,
  picture: String,
  isInside: Boolean,
  health: Number,
  money: Number
});

module.exports = mongoose.model("User", userSchema);
