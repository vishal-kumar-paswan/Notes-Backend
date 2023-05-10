const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signup, signin, signout } = require("../controllers/auth");

router.post("/signup",
    [
        check("name", "name is required").exists(),
        check("name", "Name should be of atleast length 1").isLength({ min: 1 }),
        check("email", "Email is required").exists(),
        check("email", "You must enter a valid email").isEmail(),
        check("password", "Password is required").exists(),
        check("password", "Password should be of atleast length 3").isLength({ min: 3 }),
    ],
    signup
);
router.post("/signin",
    [
        check("email", "Email is required").exists(),
        check("email", "You must enter a valid email").isEmail(),
        check("password", "Password is required").exists(),
        check("password", "Password should be of atleast length 3").isLength({ min: 3 }),
    ],
    signin
);
router.get("/signout", signout);

module.exports = router;