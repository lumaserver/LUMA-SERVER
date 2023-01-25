const dollService = require("../services/dollService");
const userService = require("../services/userService");

//GET all Active users
const getAllData = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const allDollParts = await dollService.getAllDollPieces();

    let user = await userService.getUserByEmail(userEmail);
    
    let allData = {};

    if (user.isJoshua) {
      const allUsers = await userService.getAllActiveUsers();
      const users = allUsers.filter((allUsers) => {
        return allUsers.isJoshua == false;
      });
      allData = {
        users: users,
        doll: allDollParts,
        
      };
    }
    
    if(!user.isJoshua) {
      allData = {
        user: user,
        doll: allDollParts,
      };
    }

    

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
