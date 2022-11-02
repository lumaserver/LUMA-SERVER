const User = require("../models/userModel");


const loginUser = async (idToken, newUser) => {
  try {
    const user = await User.findOne({ idToken: idToken });
    if (!user) {
      //insert new admin user
      
      if (JSON.parse(process.env.LUMA_ADMIN).includes(newUser.email)) {
        let userToInsert = new User({ ...newUser, isJoshua: true });
        const createdUser = await userToInsert.save();
        return createdUser;

      } else {
        //insert normal user
        let userToInsert = new User(newUser);
        const createdUser = await userToInsert.save();
        return createdUser;
      }
  
    }
    if (!user.isActive) {
      //update user to active
      const updatedUser = await User.findOneAndUpdate(
        { idToken: idToken },
        { isActive: true },
        { new: true }
      );
      return updatedUser;
    }
    return user;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

//GET all users
const getAllActiveUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } 
  catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  getAllActiveUsers
};
