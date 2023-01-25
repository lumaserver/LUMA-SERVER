require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = async (email) => {
   const result = await jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 15 })
   // console.log(`AccessToken: ${result}`);
   
   return result
}

const generateRefreshToken = async (email) => {
   const result = await jwt.sign({data: email}, process.env.REFRESH_TOKEN_SECRET)
   // console.log(`RefreshToken: ${result}`);
   return result
}

module.exports = {
   generateAccessToken,
   generateRefreshToken
}
