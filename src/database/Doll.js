const dollPieces = require('../data/dollPieces')
const Doll = require("../models/dollModel");
const DollPiece = require("../models/dollPieceModel");


const createDollAndDollPiece = async () => {
  
  try {
    let dollToInsert = new Doll();
    const createdDoll = await dollToInsert.save();
    console.log(createdDoll)
    dollPieces.map(async (item) => { 

      let dollPiecesToInsert = new DollPiece();
      const createdDollPiece = await dollPiecesToInsert.save();
      console.log(`create 1 ${createdDollPiece} `);
      const filter = {missionStatus: 'missionStarted'}
      
      const doll = await createdDoll.findByIdAndUpdate( filter, {$push: { bodyPart: createdDollPiece._id }}, {
         new: true 
      });
      console.log(`create 2 ${doll}`);
    })
    
  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllDollPieces = async () => {
  try {
    const allDollParts = await Doll.find();
    return allDollParts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllDollPieces,
  createDollAndDollPiece
};

/*
const doll = await createdDoll.findByIdAndUpdate(req.params.id, {
      $push: {
        bodyPart: {
          "name": "head",
          "img": "require('../src/assets/head.jpg')"
        }
      },
    });
*/