const User = require("../models/userModel");

const loginUser = async (newUser) => {
  try {
    const user = await User.findOne({ email: newUser.email });
    if (!user) {
      //insert new admin user

      if (
        LUMA_ADMIN == newUser.email || process.env.MORTIMER === newUser.email
      ) {
        let userToInsert = new User({
          ...newUser,
          isJoshua: true,
          isInside: null,
          health: 999999,
          money: 999999,
        });
        const createdUser = await userToInsert.save();
        return createdUser;
      } else {
       
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
        {new: true}
      );
      return updatedUser;
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllActiveUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const changeCryptValue = async (email) => {
  try {
    const updateUser = await User.findOne({ email });
    const filter = { email: updateUser.email };
    const update = { isInside: updateUser.isInside };

    update.isInside? update.isInside = false : update.isInside = true;

    const isInTheCrypt = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    return isInTheCrypt;
  } catch (error) {
    throw error;
  }
};

//UPDATE money and health
const updateUser = async (userEmail, updateData) => {
  try {
    const filter = { email: userEmail };
    const moneyAndHealth = await User.findOneAndUpdate(filter, updateData, {
      new: true,
    });
    return moneyAndHealth;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser,
};
