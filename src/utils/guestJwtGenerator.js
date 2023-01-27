require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateGuestAccessToken = async (guest_Login) => {
   console.log(`Guest Access token ${guest_Login}`)
   const guestResult = await jwt.sign({data: guest_Login}, process.env.ACCESS_TOKEN_SECRET)
   // console.log(`AccessToken: ${result}`);
   
   return guestResult
}

const generateGuestRefreshToken = async (guest_Login) => {
   console.log(`Guest Refres token ${guest_Login}`)

   const guestResult = await jwt.sign({data: guest_Login}, process.env.REFRESH_TOKEN_SECRET)
   // console.log(`RefreshToken: ${result}`);
   return guestResult
}

module.exports = {
    generateGuestAccessToken,
    generateGuestRefreshToken
}