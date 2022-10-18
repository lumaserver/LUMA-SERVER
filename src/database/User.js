const User=require('../models/userModel');

//GET ONE
const getOneUser= async (userId)=>{
    try {
        const user= await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

//POST
const createNewUser = async (newUser)=>{
    try {
        let userToInsert=new User(newUser);
        const createdUser= await userToInsert.save();
        return createdUser;
    } catch (error) {
        throw error;
    }   
}

//PATCH
const updateOneUser = async (userId, changes)=>{
    try {
        const updatedUser= await User.findByIdAndUpdate(userId, { $set: changes});
        return updatedUser;
    } catch (error) {
        throw error;
    }   
}


module.exports={
    getOneUser,
    createNewUser,
    updateOneUser
}