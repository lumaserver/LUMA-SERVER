require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (token) => {
  
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("UNAUTHORIZED");
    return null;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
    if (error) {
      console.log("FORBIDDEN");
      console.log(error);
     return null;
    }

    req.email = email;
    return true;
  });
};
exports.authenticateToken = authenticateToken;