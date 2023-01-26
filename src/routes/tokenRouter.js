const express = require("express");
const router = express.Router();
const token = require("../controllers/tokenController");

router.get("/", token.createNewTokens)

module.exports = router;