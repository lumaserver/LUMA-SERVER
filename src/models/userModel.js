const mongoose=require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    idToken: Number,
    name: String,
    mail: String,
    isJoshua: Boolean,
    isActive: Boolean
});

module.exports = mongoose.model('User', userSchema);