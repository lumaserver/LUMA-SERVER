const admin = require("../config/firebaseConfig");

const firebaseAuth = async (req, res, next) => {
  const token = req.body.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return next();
    }
    return res.json({ message: "Unauthorized" });
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = firebaseAuth;
