const admin = require("../config/firebaseConfig");

const firebaseAuth = async (req, res, next) => {
  //console.log(req.body.idToken)
  const token = req.body.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    //console.log(decodeValue);
    
    if (decodeValue) {
      next();
    } else {
      res.status(400).send({ status: "" });
    }
    //res.send(400);
  } catch (error) {
    res.status(400).send({ status: error });

    //res.send(400);
  }
};

module.exports = firebaseAuth;
