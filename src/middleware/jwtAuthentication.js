require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("UNAUTHORIZED");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
    if (error) {
      console.log("FORBIDDEN");
      console.log(error);
      return res.sendStatus(403);
    }

    req.email = email;
    next();
  });
};
exports.authenticateToken = authenticateToken;
