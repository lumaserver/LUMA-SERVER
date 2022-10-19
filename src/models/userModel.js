const mongoose=require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    idToken: String,
    name: String,
    mail: String,
    role: String,
    isActive: Boolean
});

module.exports = mongoose.model('User', userSchema);