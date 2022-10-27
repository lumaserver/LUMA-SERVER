const admin = require("../config/firebaseConfig");

const firebaseEmail = async (req, res, next) => {
  const email = req.body.email;
  console.log("Hola4")
  try {
    //const domain = await admin.auth().email.isFQDN('*@aeg.eus');
    //const email= await admin.auth().email.isEmail('lumaAEG@gmail.com');
    if (/@aeg.eus\s*$/.test(email)) {
      return next();
    }
    return res.json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error)
    return res.json({ message: error});
  }
};

module.exports = firebaseEmail;