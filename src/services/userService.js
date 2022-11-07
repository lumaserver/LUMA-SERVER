const User = require("../database/User");

//POST
const createNewUser = async (newUser) => {
  try {
    const createdUser = await User.loginUser(newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

//GET all users
const getAllActiveUsers = async () => {
  try {
    const allActiveUsers = await User.getAllActiveUsers();
    return allActiveUsers;
  } catch (error) {
    throw error
  }
}

const changeCryptValue = async (email) => {
  try {
    const isInTheCrypt = await User.changeCryptValue(email);

    return isInTheCrypt;
  } catch (error) {
    throw error
  }
}

//UPDATE money and health

const updateUser = async (userEmail, updateData) => {
  try {
    const update = await User.updateUser(userEmail, updateData);

    return update;
  } catch (error) {
    throw error
  }
}


module.exports = {
  createNewUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser
};
