
const dollService = require("../services/dollService");

//POST create doll and dollPieces documents
const createDollAndDollPiece = async (req, res) => {
 
  try {
    const createdDoll = await dollService.createDollAndDollPiece();
    res.send({ status: "OK", data: createdDoll });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

//GET all dollPieces
const getAllDollPieces = async (req, res) => {
  try {
    const allDollParts = await dollService.getAllDollPieces();
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

//DELETE dollPieces and Doll
const deleteDollAndDollPieces = async (req, res) => {
  try {
    await dollService.deleteDollAndDollPieces();
    res.send({ status: "OK"});
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
}


module.exports = {
  getAllDollPieces,
  createDollAndDollPiece,
  deleteDollAndDollPieces
};
