const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/jwtGenerator");

const createNewTokens = async (req, res) => {
    try {
        console.log(`controler token ${req.params.email}`)
        const accessToken = await generateAccessToken(req.params.email);
        // console.log(`accessToken result ${accessToken}`)
        const refreshToken = await generateRefreshToken(req.params.email);
        //console.log(`refresToken result ${refreshToken}`)
        const user = toObject();
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        res.status(201).send({ status: "OK", user });
        //res.send({ status: "OK", data: createdUser });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            message: "Failed making the req: ",
            data: { error: error?.message || error },
        });
    }
}

module.exports = {
    createNewTokens,
}