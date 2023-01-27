const { GUEST_SESSION } = require("../constants");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtGenerator");
const {
  generateGuestAccessToken,
  generateGuestRefreshToken,
} = require("../utils/guestJwtGenerator");

const createNewTokens = async (req, res) => {
  try {
    //console.log(`controler token ${req.params.email}`);
    const accessToken = await generateAccessToken(req.params.email);
    //console.log(`accessToken result ${accessToken}`);
    const refreshToken = await generateRefreshToken(req.params.email);
    //console.log(`refresToken result ${refreshToken}`);
    const tokens = { accessToken, refreshToken };
    res.status(201).send({ status: "OK", tokens });
    //res.send({ status: "OK", data: createdUser });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

const createNewNonExpiredTokens = async (req, res) => {
  try {
    console.log(`controler token ${GUEST_SESSION}`);
    const accessToken = await generateGuestAccessToken(GUEST_SESSION);
    console.log(`accessToken result ${accessToken}`);
    const refreshToken = await generateGuestRefreshToken(GUEST_SESSION);
    console.log(`refresToken result ${refreshToken}`);
    const tokens = { accessToken, refreshToken };
    res.status(201).send({ status: "OK", tokens });
    //res.send({ status: "OK", data: createdUser });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: "Failed making the req: ",
      data: { error: error?.message || error },
    });
  }
};

module.exports = {
  createNewTokens,
  createNewNonExpiredTokens,
};
