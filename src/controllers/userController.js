const userService = require("../services/userService");

//POST
const createNewUser = async (req, res) => {
  const { token } = req.body;
  const { name, email, picture } = req.body.claims;

  if (!token || !name || !email || !picture) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'idToken', 'name', 'email'",
      },
    });
  }

  const newUser = {
    idToken: token,
    idSocket: null,
    name,
    email,
    picture,
  };

  try {
    const createdUser = await userService.createNewUser(newUser);
    res.send({ status: "OK", data: createdUser.isJoshua });
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
      return allUsers.isActive == true && allUsers.isJoshua == false
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
}

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
}

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
}


module.exports = {
  createNewUser,
  getAllActiveUsers,
  changeCryptValue,
  updateUser
};
