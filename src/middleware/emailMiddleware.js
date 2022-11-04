const admin = require("../config/firebaseConfig");

const firebaseEmail = async (req, res, next) => {
  const email = req.body.claims.email;
  try {
    if (/^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) || JSON.parse(process.env.LUMA_ADMIN).includes(email) || JSON.parse(process.env.JOSHUA).includes(email)) {
      console.log("a")
      return next();
    }
    else{
      console.log("b")
      return res.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error)
    return res.json({ message: error});
  }
};

module.exports = firebaseEmail;