const userService = require("../services/userService");

const firebaseEmail = async (data) => {

  const email = data.claims.email;
  try {
    if (
      /^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) ||
      process.env.LUMA_ADMIN === email || process.env.MORTIMER === email
    ) {
      const createdUser = await userService.createNewUser(data);
      
      return createdUser;
    } else {
      return null
    }
  } catch (error) {
    return null;
  }
};

module.exports = firebaseEmail;
