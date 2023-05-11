const express = require("express");
const router = express.Router();
const { updatedetails } = require("../controllers/user");
const { isSignedin } = require("../controllers/auth");

router.put("/update-details/:userId", isSignedin, updatedetails);

module.exports = router;
