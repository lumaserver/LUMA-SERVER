const dollPiecesData = require('../data/dollPieces')
const Doll = require("../models/dollModel");
const DollPiece = require("../models/dollPieceModel");

//POST create doll and dollPieces documents
const createDollAndDollPiece = async () => {

  try {
    let dollToInsert = new Doll()
    const createdDoll = await dollToInsert.save()
    console.log(`database create doll ${createdDoll}`)

//Promise.all para no perder la sincronia del map, ejecuta cada secuencia por cada vez que tiene que recorrer el map
    await Promise.all(

      dollPiecesData.map(async (item) => {

        let dollPiecesToInsert = new DollPiece(item);
        console.log(`database insert pieces ${dollPiecesToInsert}`)

        const createdDollPiece = await dollPiecesToInsert.save()
        console.log(`database create pieces ${createdDollPiece}`)

        const filter = { missionStatus: 'missionStarted' }
        return  await Doll.findOneAndUpdate(filter, { $push: { bodyPart: createdDollPiece._id } }, {
          new: true
        });
        
      })
    ) 
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//GET all doll pieces
const getAllDollPieces = async () => {
  try {
    const allDollParts = await Doll.find().populate('bodyPart')
    console.log(`Database getAllDollPieces ${allDollParts[0]}`)

    return allDollParts[0];
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
    const UpdateDollPiece = await DollPiece.find()
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
