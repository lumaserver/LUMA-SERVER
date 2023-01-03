const firebaseEmail = require("./emailMiddleware");
const admin = require("../config/firebaseConfig");


const firebaseAuth = async (data) => {
  
  const token = data.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    
    if (decodeValue) {
      const newUser = await firebaseEmail(data);
      console.log(newUser)
      return newUser;
    }else{
      return null
    }
   
  } catch (error) {
    return null;
  }
};

module.exports = firebaseAuth;