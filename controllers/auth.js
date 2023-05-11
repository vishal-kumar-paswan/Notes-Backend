const { validationResult } = require("express-validator");
const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken");
const { expressjwt: expressjwt } = require("express-jwt");

// Signup user
exports.signup = async (req, res) => {
    try {
        // Checking all parameters exists / is correct
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
                params: errors.array()[0].param,
            });
        }

        const { email } = req.body;

        // Checking if the user is already registered
        const emailExists = await User.findOne({ email }).exec();
        if (emailExists) {
            return res.status(403).json({ error: "User already exists" });
        }

        const user = new User(req.body);
        const newUser = await user.save();
        // Checking if new user is saved into the database
        if (!newUser) {
            return res.status(403).json({ error: "Failed to create new user" });
        }
        return res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Signin user
exports.signin = async (req, res) => {
    try {
        // Checking all parameters exists / is correct
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
                params: errors.array()[0].param,
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v").exec();

        // Checking if User exists or not
        if (!user) {
            return res.status(403).json({ error: "User does not exists" });
        }

        // Checking if password is correct or not
        if (user.authenticate(password)) {

            const { _id, name, bio } = user;
            // Generating token using user email
            const token = jsonWebToken.sign({ email: email }, process.env.SECRET);
            // Setting cookie with the token that will expire after one day
            res.cookie("token", token, { expire: new Date() + 1 });

            return res.status(202).json({ _id: _id, name: name, email: email, bio: bio });
        }
        return res.status(403).json({ error: "Password is incorrect" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Check if user is signed in
exports.isSignedin = expressjwt({
    secret: 'SECRET',
    algorithms: ["HS256"],
    userProperty: "auth",
});

// Signout user
exports.signout = async (req, res) => {
    // Clearing cookie
    res.clearCookie("token");
    return res.status(205).json({ message: "User signed out" });
}