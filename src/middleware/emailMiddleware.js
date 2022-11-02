const admin = require("../config/firebaseConfig");

const firebaseEmail = async (req, res, next) => {
  const email = req.body.claims.email;
  console.log(email);
  try {
    //const domain = await admin.auth().email.isFQDN('*@aeg.eus');
    //const email= await admin.auth().email.isEmail('lumaAEG@gmail.com');
    if (/^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) || JSON.parse(process.env.LUMA_ADMIN) || JSON.parse(process.env.JOSHUA)) {
      return next();
    }
    return res.json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error)
    return res.json({ message: error});
  }
};

module.exports = firebaseEmail;