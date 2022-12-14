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
    await Doll.updateMissionStatus(updateData);

  } catch (error) {
    throw error
  }
}

const updateDollPiece = async (pieceName, updateData) => {
  try {
    await Doll.updateDollPiece(pieceName, updateData);
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
