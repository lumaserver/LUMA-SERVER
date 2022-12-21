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

      const filter = { missionStatus: 'missionStarted' }
      const doll = await Doll.findOneAndUpdate(filter, { $push: { bodyPart: createdDollPiece._id } }, {
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
     const allDoll = await Doll.find()
    //console.log(`Database ${allDollParts[0].bodypart}`)
    /* console.log(`Database1 ${typeof allDollParts[0]}`)
    console.log(`Database2 ${typeof allDollParts}`)
    console.log(`Database3 ${typeof allDollParts.bodyPart}`) */
   const allDollParts = await DollPiece.find();
   console.log(`Database1 ${allDoll}`)
   console.log(`Database2 ${allDollParts}`)

   

    return allDollParts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



const updateMissionStatus = async (updateData) => {
  try {
    await Doll.updateMany({}, updateData)
    const doll = await Doll.find()
    return doll[0]
  } catch (error) {
    throw error;
  }
};

const updateDollPiece = async (updateData) => {
  try {
    const filter = { pieceName: updateData.pieceName };
    await DollPiece.findOneAndUpdate(filter, updateData, {
      new: true
    });
    const UpdateDollPiece = await DollPiece.findOne(filter)
    return UpdateDollPiece;
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
