const admin = require("../config/firebaseConfig");
const userService = require("../services/userService");

const firebaseEmail = async (data) => {
  console.log("firebaseemail")
  const email = data.claims.email;
  try {
    if (
      /^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) ||
      process.env.LUMA_ADMIN === email || process.env.MORTIMER === email
    ) {
      const createdUser = await userService.createNewUser(newUser);
      return createdUser;
    } else {
      return null
    }
  } catch (error) {
    return res.status(401).send({message: error.message});
  }
};

module.exports = firebaseEmail;
