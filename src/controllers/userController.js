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
    name,
    email,
    picture,
    isJoshua: false,
    isActive: true,
    isInside: false,
    health: 100,
    money: 29

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

      if(activeUsers.length == 0){
        return res.status(400).send({message: "No hay usuarios activos"});
      }
        return res.send({ status: "OK", data: activeUsers});
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
}

const changeCryptValue = async (req, res) => {
  const user = req.body;
  try {
    const isInTheCrypt = await userService.changeCryptValue(user);
    if(isInTheCrypt){
      return res.send({ status: "OK", data: isInTheCrypt});
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
const changeMoneyAndHealth = async (req, res) => {
  const userEmailMoneyAndHealth = req.body;
  try {
    const money = await userService.changeMoneyAndHealth(userEmailMoneyAndHealth);
    return res.send({ status: "OK", data: money});
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
  changeMoneyAndHealth
};
