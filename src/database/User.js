const { ACOLIT_AWAKE_STATUS, DESCENT_RESISTENCE,
  RISE_RESISTENCE,
  DESCENT_CONCENTRATION,
  RISE_CONCENTRATION,
  ACOLIT_SLEEP_STATUS,
  ACOLIT_UNCONSCIOUS_STATUS, 
  RESISTANCE_MIN_VALUE,
  RESISTANCE_MAX_VALUE} = require("../constants");
const User = require("../models/userModel");
const { all } = require("../routes/userRoutes");

const loginUser = async (newUser) => {
  try {
    const user = await User.findOne({ email: newUser.email });
    if (!user) {
      //insert new admin user

      if (
        process.env.LUMA_ADMIN === newUser.email || process.env.MORTIMER === newUser.email
      ) {
        let userToInsert = new User({
          ...newUser,
          isJoshua: true,
          isInside: null,
          health: 999999,
          money: 999999,
          resistance: null,
          concentration: null,
        });
        const createdUser = await userToInsert.save();
        return createdUser;
      } else {

        let userToInsert = new User({
          ...newUser
        });

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
    console.log(error);
    throw error;
  }
};

const getAllActiveUsers = async () => {
  try {
    const allUsers = await User.find();
    const allAcolit = allUsers.filter(item =>  item.isJoshua == false)
    return allAcolit;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const getUserByEmail = await User.findOne({ email }); 
    return getUserByEmail;
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

    update.isInside ? update.isInside = false : update.isInside = true;

    const isInTheCrypt = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(`database Inside ${isInTheCrypt}`)
    return isInTheCrypt;
  } catch (error) {
    throw error;
  }
};

//UPDATE money and health
const updateUser = async (data) => {
  try {
  const filter = { email: data.email };
  const updateData = data  
  const moneyAndHealth = await User.findOneAndUpdate(filter, updateData, {
  new: true,
  });
  
  return moneyAndHealth;
  } catch (error) {
  throw error;
  }
  };

//UPDATE Acolit Resistance And Concentration with CRON
const updateAcolitResistanceAndConcentration = async () => {
  try {
    await User.updateMany(
      { isJoshua: { $eq: false }, acolitStatus: { $eq: ACOLIT_AWAKE_STATUS }, resistance: { $gt: RESISTANCE_MIN_VALUE } },
      { $inc: { resistance: DESCENT_RESISTENCE, concentration: DESCENT_CONCENTRATION } },
    )
      .then(async () => {
        await User.updateMany(
          { isJoshua: { $eq: false }, acolitStatus: { $eq: ACOLIT_SLEEP_STATUS }, resistance: { $lt: RESISTANCE_MAX_VALUE } },
          { $inc: { resistance: RISE_RESISTENCE, concentration: RISE_CONCENTRATION, } },
        );
      })
      .then(async() => {
        await updateAcolitStatusByResistance()
      })
      .catch(error => {
        // ocurrió un error durante la actualización de los acólitos
      });
      
  } catch (error) {
    throw error;
  }
};

const updateAcolitStatusByResistance = async () => {
  try {

    await User.updateMany(
      { isJoshua: { $eq: false }, acolitStatus: { $eq: ACOLIT_AWAKE_STATUS }, resistance: { $lte: RESISTANCE_MIN_VALUE } },
      { $set: { acolitStatus: ACOLIT_UNCONSCIOUS_STATUS } },
    )
    .then(async() => {
      await User.updateMany(
        { isJoshua: { $eq: false }, acolitStatus: { $eq: ACOLIT_SLEEP_STATUS }, resistance: { $eq: RESISTANCE_MAX_VALUE } },
        { $set: { acolitStatus: ACOLIT_AWAKE_STATUS } },
      );
    })    
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser,
  updateAcolitResistanceAndConcentration,
  updateAcolitStatusByResistance,
  getUserByEmail,
};
