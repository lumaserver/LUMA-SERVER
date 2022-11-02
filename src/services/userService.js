const User = require("../database/User");

//POST
const createNewUser = async (idToken, newUser) => {
  try {
    const createdUser = await User.loginUser(idToken, newUser);
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

module.exports = {
  createNewUser,
  getAllActiveUsers
};
