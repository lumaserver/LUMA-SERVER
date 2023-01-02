const admin = require("../config/firebaseConfig");
import firebaseEmail from "./emailMiddleware";

const firebaseAuth = async (data) => {
  const token = data.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    
    if (decodeValue) {
      const newUser = await firebaseEmail(data);
      return newUser;
    }else{
      return
    }
   
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = firebaseAuth;