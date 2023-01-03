const firebaseEmail = require("./emailMiddleware");
const admin = require("../config/firebaseConfig");


const firebaseAuth = async (data) => {
  console.log("firebaseAuth")
  const token = data.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    
    if (decodeValue) {
      const newUser = await firebaseEmail(data);
      return newUser;
    }else{
      return null
    }
   
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = firebaseAuth;