require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
console.log("aaa" + req.headers)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("UNAUTHORIZED");
    res.status(401).send({ status: "UNAUTHORIZED" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
    if (error) {
      console.log("FORBIDDEN");
      console.log(error);
      res.status(403).send({ status: error });
    }

    req.email = email;
    next()
  });

};
module.exports = authenticateToken;