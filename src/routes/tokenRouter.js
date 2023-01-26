const express = require("express");
const router = express.Router();
const token = require("../controllers/tokenController");
const jwtRefreshMiddleWare = require("../middleware/jwtRefreshGenerate");


router.get("/", jwtRefreshMiddleWare, token.createNewTokens)

module.exports = router;