const dollService = require("../services/dollService");

//GET all Active users
const getAllDollParts = async (req, res) => {
  try {
    const allDollParts = await dollService.getAllDollParts();
      if(allDollParts.length == 0){
        return res.status(400).send({message: "There are not a doll"});
      }
        return res.send({ status: "OK", data: allDollParts });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
}


module.exports = {
  getAllDollParts,
};
