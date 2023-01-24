
const firebaseEmail = async (req, res, next) => {

  const email = req.body.claims.email;
  try {
    if (
      /^\w+([\.-]?\w+)*@\ikasle.aeg.eus/.test(email) ||
      process.env.LUMA_ADMIN === email || process.env.MORTIMER === email
    ) {
      //console.log("SOY ADMINISTRADOR PASO EL EMAIL MIDDLEWARE")
      next();
    } else {
      res.send(400);
    }
  } catch (error) {
    res.send(400);
  }
};

module.exports = firebaseEmail;
