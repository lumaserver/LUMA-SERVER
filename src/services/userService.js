const User = require("../database/User");

// //GET
// const getOneUser= async (userId)=>{
//     try {
//         const user=User.getOneUser(userId);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

//POST
const createNewUser = async (idToken, newUser) => {
  try {
    const createdUser = User.loginUser(idToken, newUser);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

//PATCH
// const updateOneUser = async (userId, changes) =>{
//     try {
//         const updatedUser=User.createNewUser(userId, changes);
//         return updatedUser;
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = {
  createNewUser,
  //   getOneUser,
  //   updateOneUser
};
