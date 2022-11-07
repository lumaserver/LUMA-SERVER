const admin = require("../config/firebaseConfig");

const firebaseEmail = async (req, res, next) => {
  const email = req.body.claims.email;
  try {
    if (
      /^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) ||
      JSON.parse(process.env.LUMA_ADMIN).includes(email)
    ) {
      console.log("a");
      return next();
    } else {
      throw new Error("email unauthorized");
    }
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

module.exports = firebaseEmail;
