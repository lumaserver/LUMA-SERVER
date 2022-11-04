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

const changeCryptValue = async (user) => {
  try {
    const isInTheCrypt = await User.changeCryptValue(user);

    return isInTheCrypt;
  } catch (error) {
    throw error
  }
}

//UPDATE money and health

const changeMoneyAndHealth = async (userEmailMoneyAndHealth) => {
  try {
    const update = await User.changeMoneyAndHealth(userEmailMoneyAndHealth);

    return update;
  } catch (error) {
    throw error
  }
}


module.exports = {
  createNewUser,
  getAllActiveUsers,
  changeCryptValue,
  changeMoneyAndHealth
};
