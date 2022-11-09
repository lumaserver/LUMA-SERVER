const admin = require("../config/firebaseConfig");

const firebaseEmail = async (req, res, next) => {
  const email = req.body.claims.email;
  try {
    if (
      /^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) ||
      process.env.LUMA_ADMIN === email
    ) {
      return next();
    } else {
      throw new Error("email unauthorized");
    }
  } catch (error) {
    return res.status(401).send({message: error.message});
  }
};

module.exports = firebaseEmail;
