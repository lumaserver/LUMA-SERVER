const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  idToken: String,
  name: String,
  email: String,
  isJoshua: Boolean,
  isActive: Boolean,
});

module.exports = mongoose.model("User", userSchema);
