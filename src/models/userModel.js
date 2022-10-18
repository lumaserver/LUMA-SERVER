const mongoose=require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    mail: String,
    role: String,
    isActive: Boolean
});

module.exports = mongoose.model('User', userSchema);