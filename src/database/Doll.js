const Doll = require("../models/dollModel");


const getAllDollParts = async () => {
  try {
    const allDollParts = await Doll.find();
    return allDollParts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllDollParts,
};
