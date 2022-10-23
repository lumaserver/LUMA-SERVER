const User = require("../database/User");

//POST
const createNewUser = async (idToken, newUser) => {
  try {
    const createdUser = User.loginUser(idToken, newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewUser
};
