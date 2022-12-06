const User = require("../models/userModel");

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

    update.isInside ? update.isInside = false : update.isInside = true;

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
    console.log(filter);

    const moneyAndHealth = await User.findOneAndUpdate(filter, updateData, {
      new: true,
    });
    return moneyAndHealth;
  } catch (error) {
    throw error;
  }
};

const updateAcolitResistanceAndConcentration = async () => {
  try {
    console.log('database1')
    const updateAcolit = await User.updateMany(
      { isJoshua: { $eq: false }, acolitStatus: { $eq: "awake" }, resistance: {$gt: 10} },
      { $inc: { resistance: - 10, concentration: - 10 } },
      { multi: true }
    )
      .then(() => {
        return User.updateMany(
          { isJoshua: { $eq: false }, acolitStatus: { $eq: "sleeping" }, resistance: {$lt: 100} },
          { $inc: { resistance: 10, concentration: 10, } },
          { multi: true }
        );
      })
      .then(() => {
        // todos los acólitos han sido actualizados
      })
      .catch(error => {
        // ocurrió un error durante la actualización de los acólitos
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
  updateAcolitResistanceAndConcentration
};


/*
const updateAcolit = await User.updateMany(
      { isJoshua: { $eq: false }, acolitStatus: { $eq: "awake" } },
      { $inc: { resistance: - 10, concentration: - 10 } })
*/

/*
const updateAcolit = await User.updateMany(
      { isJoshua: { $eq: false }},
      {$inc: {
        resistance: {
          $cond: { if: { $eq: ['$acolitStatus', 'awake'] }, then: -10, else: 10 },
        },
      },
    },
    );
*/

/*
const updateAcolit = await User.updateMany(
      {},
      {resistance: { $switch: {branches: [
          { case: { $eq: [ "$acolitStatus", 'awake' ] }, then: {$inc: { resistance: -10 }}},
          { case: { $eq: [ "$acolitStatus", 'sleeping' ] }, then: {$inc: { resistance: 10 }}},
        ],
        default: {$inc: { resistance: 0 }}}}
      },
    )
*/

/*
const updateAcolit = await User.updateMany(
      {},
  {$inc: { resistance:{ $switch: {branches: [
      { case: { $eq: [ "$acolitStatus", 'awake' ] }, then:  -10 },
      { case: { $eq: [ "$acolitStatus", 'sleeping' ] }, then: 10 },
    ],
    default: {$inc: { resistance: 0 }}}}
  }}
)
*/

///////// FUNCIONA
/*
const updateAcolit = await User.updateMany(
      { isJoshua: { $eq: false }, acolitStatus: { $eq: "awake" } },
      { $inc: { resistance: - 10, concentration: - 10 } },
      { multi: true }
    )
      .then(() => {
        return User.updateMany(
          { isJoshua: { $eq: false }, acolitStatus: { $eq: "sleeping" } },
          { $inc: { resistance: 10, concentration: 10 } },
          { multi: true }
        );
      })
      .then(() => {
        // todos los acólitos han sido actualizados
      })
      .catch(error => {
        // ocurrió un error durante la actualización de los acólitos
      });
*/

/*
const updateAcolit = await User.updateMany(
      { isJoshua: { $eq: false }, acolitStatus: { $eq: "awake" } },
      { $inc: { resistance: - 10, concentration: - 10 }, $min:{ resistance: 10, concentration: 10} },
      { multi: true }
    )
      .then(() => {
        return User.updateMany(
          { isJoshua: { $eq: false }, acolitStatus: { $eq: "sleeping" } },
          { $inc: { resistance: 10, concentration: 10, }, $max:{ resistance: 100, concentration: 100} },
          { multi: true }
        );
      })
      .then(() => {
        // todos los acólitos han sido actualizados
      })
      .catch(error => {
        // ocurrió un error durante la actualización de los acólitos
      });
*/