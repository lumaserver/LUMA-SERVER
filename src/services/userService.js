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

//GET all users
const getAllActiveUsers = async () => {
  try {
    console.log("services");
    const allAvtiveUsers = User.getAllActiveUsers();
    if( allAvtiveUsers.isActive == true){
      return allAvtiveUsers;
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createNewUser,
  getAllActiveUsers
};
