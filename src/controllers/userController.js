const userService = require("../services/userService");

//POST
const createNewUser = async (req, res) => {
  const { token } = req.body;
  const { name, email } = req.body.claims;

  if (!token || !name || !email) {
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
    isJoshua: false,
    isActive: true,
  };

  try {
    const createdUser = await userService.createNewUser(token, newUser);
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
    console.log("controller");
    const allUsers = await userService.getAllActiveUsers();
    const activeUsers = allUsers.filter(allUsers => allUsers.isActive = true);
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
module.exports = {
  createNewUser,
  getAllActiveUsers,
};
