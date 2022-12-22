const Doll = require("../database/Doll");



//POST create doll and dollPieces documents
const createDollAndDollPiece = async () => {

  try {
    const createdDoll = await Doll.createDollAndDollPiece();
    return createdDoll;
  } catch (error) {
    throw error;
  }
};

//GET all doll pieces
const getAllDollPieces = async () => {
  try {
    const allDollParts = await Doll.getAllDollPieces();
    return allDollParts;
  } catch (error) {
    throw error
  }
};

const updateMissionStatus = async (updateData) => {
  try {
    const dollUpdate = await Doll.updateMissionStatus(updateData);
    return dollUpdate

  } catch (error) {
    throw error
  }
}

const updateDollPiece = async (updateData) => {
  try {
    const dollPiece = await Doll.updateDollPiece(updateData);
    return dollPiece;
  } catch (error) {
    throw error
  }
}

//DELETE dollPieces and Doll
const deleteDollAndDollPieces = async () => {

  try {
    await Doll.deleteDollAndDollPieces();
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllDollPieces,
  createDollAndDollPiece,
  deleteDollAndDollPieces,
  updateMissionStatus,
  updateDollPiece

};
