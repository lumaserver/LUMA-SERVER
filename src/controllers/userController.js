const userService = require("../services/userService");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtGenerator");

//POST
const createNewUser = async (req, res) => {
  // console.log(req.body);
  /*  if (req.body) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'idToken', 'name', 'email'",
      },
    });
  } */

  try {
    const createdUser = await userService.createNewUser(req.body);
    //console.log(`user ${createdUser}`)
    const accessToken = await generateAccessToken(createdUser.email);
    // console.log(`accessToken result ${accessToken}`)
    const refreshToken = await generateRefreshToken(createdUser.email);
    //console.log(`refresToken result ${refreshToken}`)
    const user = createdUser.toObject();
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    res.status(201).send({ status: "OK", user });
    //res.send({ status: "OK", data: createdUser });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

//GET all Active users
const getAllActiveUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllActiveUsers();
    const activeUsers = allUsers.filter((allUsers) => {
      return allUsers.isActive == true && allUsers.isJoshua == false;
    });

    if (activeUsers.length == 0) {
      return res.status(400).send({ message: "There is no active users" });
    }
    return res.send({ status: "OK", data: activeUsers });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

const changeCryptValue = async (req, res) => {
  const email = req.params.email;
  try {
    const isInTheCrypt = await userService.changeCryptValue(email);
    if (isInTheCrypt) {
      return res.send({ status: "OK", data: isInTheCrypt.isInside });
    }
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

//UPDATE money and health
const updateUser = async (req, res) => {
  const userEmail = req.params.email;
  const updateData = req.body;

  try {
    await userService.updateUser(userEmail, updateData);
    return res.send({ status: "OK" });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  createNewUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser,
};
