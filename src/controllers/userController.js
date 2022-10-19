const userService = require("../services/userService");

//LOGIN
// const loginUser = async (req, res) => {
//   const { body } = req;

//   if (!body.userId) {
//     return res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter 'userId' can not be empty" },
//     });
//   }
//   try {
//     const user = await userService.getOneUser(body.userId);
//     if (user) {
//       if (!user.isActive) {
//         updateOneUser(req, res);
//       }
//       res.send({ status: "OK", data: user });
//     } else {
//       createNewUser(req, res);
//     }
//   } catch (error) {
//     res.status(error?.status || 500).send({
//       status: "FAILED",
//       message: "Failed trying the request",
//       data: { error: error?.message || error },
//     });
//   }
// };

//GET ONE
// const getOneUser = async (req, res) => {
//   const {
//     params: { userId },
//   } = req;

//   if (!userId) {
//     return res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter 'userId' can not be empty" },
//     });
//   }

//   try {
//     const user = await userService.getOneUser(userId);
//     if (!user) {
//       return res.status(404).send({
//         status: "FAILED",
//         data: { error: `Can't find user with the id ${userId}` },
//       });
//     }
//     res.send({ status: "OK", data: user });
//   } catch (error) {
//     res.status(error?.status || 500).send({
//       status: "FAILED",
//       message: "Failed trying the request",
//       data: { error: error?.message || error },
//     });
//   }
// };

//POST
const createNewUser = async (req, res) => {
  const { idToken, name, mail } = req.body;

  if(!idToken){
     return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Parameter idToken can not be empty",
      },
    });
  }

  if (!name || !mail) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mail'",
      },
    });
  }

  const newUser = {
    idToken: idToken,
    name: name,
    mail: mail,
    isJoshua: false,
    isActive: true,
  };

  try {
    const createdUser = await userService.createNewUser(idToken, newUser);
    res.send({ status: "OK", data: createdUser.isJoshua });
    
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

//UPDATE
// const updateOneUser = async (req, res) => {
//   const {
//     body,
//     params: { userId },
//   } = req;

//   if (!userId) {
//     return res.status(400).send({
//       status: "FAILED",
//       data: { error: "Parameter 'idUser' can not be empty " },
//     });
//   }

//   try {
//     const updatedUser = await userService.updateOneUser(userId, body);

//     if (!updatedUser) {
//       return res.status(404).send({
//         status: "FAILED",
//         data: { error: `Can't find user with the id` },
//       });
//     }
//     res.send({ status: "OK", data: updatedUser });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.message || error } });
//   }
// };

module.exports = {
  createNewUser,
  // loginUser,
  // getOneUser,
  // updateOneUser,
};
