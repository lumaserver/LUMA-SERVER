const dollService = require("../services/dollService");
const userService = require("../services/userService");

//GET all Active users
const getAllData = async (req, res) => {
  try {
    const allUsers = await userService.getAllActiveUsers();
    const allDollParts = await dollService.getAllDollPieces();
    const acolitUsers = allUsers.filter((allUsers) => {
      return allUsers.isJoshua == false;
    });

    const allData = {
      users: [acolitUsers],
      doll: allDollParts
    };
    
    console.log(req.params)

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
