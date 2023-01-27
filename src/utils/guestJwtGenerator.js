require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateGuestAccessToken = async (email) => {
   const guestResult = await jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET)
   // console.log(`AccessToken: ${result}`);
   
   return result
}

const generateGuestRefreshToken = async (email) => {
   const result = await jwt.sign({data: email}, process.env.REFRESH_TOKEN_SECRET)
   // console.log(`RefreshToken: ${result}`);
   return guestResult
}

module.exports = {
    generateGuestAccessToken,
    generateGuestRefreshToken
}