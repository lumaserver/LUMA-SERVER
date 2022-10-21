const admin = require("../config/firebaseConfig");

const firebaseAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];;
  console.log(token);
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    console.log(decodeValue);
    if (decodeValue) {
      return next();
    }
    return res.json({ message: "Unauthorized" });
  } catch (error) {
    return res.json({ message: "Internal Error" });
  }
};

module.exports = firebaseAuth;
