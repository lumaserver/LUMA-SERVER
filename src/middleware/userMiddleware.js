const admin = require("../config/firebaseConfig");

const firebaseAuth = async (req, res, next) => {
  const token = req.body.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      next();
    }
    res.send(400);
  } catch (error) {
    res.send(400);
  }
};

module.exports = firebaseAuth;
