const {
  ACOLIT_AWAKE_STATUS,
  DESCENT_RESISTENCE,
  RISE_RESISTENCE,
  DESCENT_CONCENTRATION,
  RISE_CONCENTRATION,
  ACOLIT_SLEEP_STATUS,
  ACOLIT_UNCONSCIOUS_STATUS,
  RESISTANCE_MIN_VALUE,
  RESISTANCE_MAX_VALUE,
  POTION_RESISTANCE_VALUE,
  CONCETRATION_MIN_VALUE,
  CONCETRATION_MAX_VALUE,
  RESISTANCE_MAX_SLEEP_VALUE,
} = require("../constants");
const User = require("../models/userModel");

const loginUser = async (newUser) => {
  
  try {
    const user = await User.findOne({ email: newUser.claims.email });
    //console.log(user)
    if (!user) {
      //insert new admin user
      let allUser = {
        idToken: newUser.token,
        idSocket: newUser.idSocket,
        name: newUser.claims.name,
        email: newUser.claims.email,
        picture: newUser.claims.picture,
      };

      if (
        process.env.LUMA_ADMIN === newUser.claims.email ||
        process.env.MORTIMER === newUser.claims.email
      ) {
        //console.log("SOY ADMINISTRADOR PASO LA VERIFICACION DE userdatabase")
        let userToInsert = new User({
          ...allUser,
          isJoshua: true,
        });
        const createdUser = await userToInsert.save();
        //console.log(createdUser);
        return createdUser;
      } else {
        let userToInsert = new User({
          ...allUser,
        });

        const createdUser = await userToInsert.save();
        return createdUser;
      }
    } else {
      
      const updatedUser = await User.findOneAndUpdate(
        { email: newUser.claims.email },
        { isActive: true, idSocket: newUser.idSocket },
        { new: true }
      );
      return updatedUser;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllActiveUsers = async () => {
  try {
    const allUsers = await User.find();
    const allAcolit = allUsers.filter((item) => item.isJoshua == false);
    return allAcolit;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllAdmin = async () => {
  try {
    const allUsers = await User.find();
    const allAdmin = allUsers.filter((item) => item.isJoshua == true);
    return allAdmin;
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

    update.isInside ? (update.isInside = false) : (update.isInside = true);

    const isInTheCrypt = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(`database Inside ${isInTheCrypt}`);
    return isInTheCrypt;
  } catch (error) {
    throw error;
  }
};

//UPDATE money and health
const updateUser = async (updateData) => {
  try {
    const filter = { email: updateData.email };
    //console.log(`Update Acolit 1 ${updateData.resistance}`)
    if (updateData.resistance == POTION_RESISTANCE_VALUE) {
      //  console.log(`Update Acolit 2 ${updateData.resistance}`)
      updateData.acolitStatus = "awake";
      updateData.concentration = POTION_RESISTANCE_VALUE
    }
    const acolitUpdate = await User.findOneAndUpdate(filter, updateData, {
      new: true,
    });

    return acolitUpdate;
  } catch (error) {
    throw error;
  }
};

//UPDATE Acolit Resistance And Concentration with CRON
const updateAcolitResistanceAndConcentration = async () => {
  try {
    await User.updateMany(
      {
        isJoshua: { $eq: false },
        acolitStatus: { $eq: ACOLIT_AWAKE_STATUS },
        resistance: { $gt: RESISTANCE_MIN_VALUE },
        concentration: { $gt: CONCETRATION_MIN_VALUE },
      },
      {
        $inc: {
          resistance: DESCENT_RESISTENCE,
          concentration: DESCENT_CONCENTRATION,
        },
      }
      //  console.log(`update resistance -1`)
    )
      .then(async () => {
        await User.updateMany(
          {
            isJoshua: { $eq: false },
            acolitStatus: { $eq: ACOLIT_SLEEP_STATUS },
            resistance: { $lte: RESISTANCE_MAX_SLEEP_VALUE },
            concentration: { $lte: CONCETRATION_MAX_SLEEP_VALUE }
          },
          {
            $inc: {
              resistance: RISE_RESISTENCE,
              concentration: RISE_CONCENTRATION,
            },
          }
          //  console.log(`update resistance +1`)
        );
      })
      .then(async () => {
        await updateAcolitStatusByResistance();
      })
      .catch((error) => {
        // ocurrió un error durante la actualización de los acólitos
      });
  } catch (error) {
    throw error;
  }
};

const updateAcolitStatusByResistance = async () => {
  try {
    await User.updateMany(
      {
        isJoshua: { $eq: false },
        acolitStatus: { $eq: ACOLIT_AWAKE_STATUS },
        resistance: { $lte: RESISTANCE_MIN_VALUE },
      },
      { $set: { acolitStatus: ACOLIT_UNCONSCIOUS_STATUS } }
      // console.log(`update status unconscious`)
    ).then(async () => {
      await User.updateMany(
        {
          isJoshua: { $eq: false },
          acolitStatus: { $eq: ACOLIT_SLEEP_STATUS },
          resistance: { $eq: RESISTANCE_MAX_VALUE },
        },
        { $set: { acolitStatus: ACOLIT_AWAKE_STATUS } }
        // console.log(`update status awake`)
      );
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser,
  updateAcolitResistanceAndConcentration,
  updateAcolitStatusByResistance,
  getUserByEmail,
  getAllAdmin,
};
