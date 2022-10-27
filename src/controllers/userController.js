const userService = require("../services/userService");

//POST
const createNewUser = async (req, res) => {
  console.log("Hola2")
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

module.exports = {
  createNewUser,
};
