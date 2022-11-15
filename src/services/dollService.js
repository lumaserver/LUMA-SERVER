const Doll = require("../database/Doll");

//GET all users
const getAllDollParts = async () => {
  try {
    const allDollParts = await Doll.getAllDollParts();
    return allDollParts;
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllDollParts,
 
};
