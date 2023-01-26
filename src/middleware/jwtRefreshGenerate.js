require("dotenv").config();
const jwt = require("jsonwebtoken");

const newTokenGenerate = (req, res, next) => {
  console.log("Refresh " + req.headers["authorization"])
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("UNAUTHORIZED");
    res.status(401).send({ status: "UNAUTHORIZED" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, email) => {
    if (error) {
      console.log("FORBIDDEN");
      console.log(error);
      res.status(403).send( error);
    }
    else {
      next()
    }
  });

};
module.exports = newTokenGenerate;