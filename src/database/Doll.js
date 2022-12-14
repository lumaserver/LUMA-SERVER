const dollPiecesData = require('../data/dollPieces')
const Doll = require("../models/dollModel");
const DollPiece = require("../models/dollPieceModel");

//POST create doll and dollPieces documents
const createDollAndDollPiece = async () => {
  
  try {
    let dollToInsert = new Doll();
    const createdDoll = await dollToInsert.save();
    dollPiecesData.map(async (item) => { 

      let dollPiecesToInsert = new DollPiece(item);
      
      const createdDollPiece = await dollPiecesToInsert.save();
    
      const filter = {missionStatus: 'missionStarted'}
      const doll = await Doll.findOneAndUpdate( filter, {$push: { bodyPart: createdDollPiece._id }}, {
         new: true 
      });
    })
    
  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET all doll pieces
const getAllDollPieces = async () => {
  try {
    const allDollParts = await Doll.find().populate('bodyPart');
    return allDollParts[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};



const updateMissionStatus = async (updateData) => {
  try {
  
    await Doll.update( updateData);
  } catch (error) {
    throw error;
  }
};

const updateDollPiece = async (pieceName, updateData) => {

  try {
    const filter = { pieceName };
    const dollPieces = await DollPiece.findOneAndUpdate(filter, updateData, {
      new: true
    });
    return dollPieces;
  } catch (error) {
    throw error;
  }
};


//DELETE dollPieces and Doll
const deleteDollAndDollPieces = async () => {
  try {
    await DollPiece.deleteMany();
    await Doll.deleteMany();
  } catch (error) {
    console.log(error);
    throw error;
  }
};


module.exports = {
  getAllDollPieces,
  createDollAndDollPiece,
  updateMissionStatus,
  deleteDollAndDollPieces,
  updateDollPiece
};
