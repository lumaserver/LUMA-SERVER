const dollService = require("../services/dollService");
const userService = require("../services/userService");

//GET all Active users
const getAllData = async (req, res) => {
  try {
  
    console.log(req.params)
    const userEmail = req.params.email;
    const isAdmin = req.params.isJoshua;
  
    const allDollParts = await dollService.getAllDollPieces();
    const acolitUsers = null;

    if (isAdmin) {
      const allUsers = await userService.getAllActiveUsers();
      acolitUsers = allUsers.filter((allUsers) => {
        return allUsers.isJoshua == false;
      });
    } else {
      acolitUsers = await userService.getCurrentUser(userEmail);
    }

    const allData = {
      users: [acolitUsers],
      doll: allDollParts
    };

    if (allData.length == 0) {
      return res.status(400).send({ message: "There is no active users" });
    }
    return res.send({ status: "OK", data: allData });

  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  getAllData,
};