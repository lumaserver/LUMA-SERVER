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
    console.log(`UserService getAllActiveUsers`)

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

//GET current user
const getUserByEmail = async (email) => {
  try {
    const currentUser = await User.getUserByEmail(email);
    return currentUser;
  } catch (error) {
    throw error
  }
}

//UPDATE money and health

const updateUser = async (data) => {
  try {
  const update = await User.updateUser(data);
  return update;
  } catch (error) {
  throw error
  }
  }

const updateAcolitResistanceAndConcentration = async () => {
  try {
    await User.updateAcolitResistanceAndConcentration();

    //const update = await User.updateAcolitResistanceAndConcentration();
    //console.log(`UserService updateAcolitResistanceAndConcentration ${update}`)
   // return update;
  } catch (error) {
    throw error
  }
}


module.exports = {
  createNewUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser,
  getUserByEmail,
  updateAcolitResistanceAndConcentration,
};