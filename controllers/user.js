const User = require("../models/user");

exports.updatedetails = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId, "-password -notes -createdAt -updatedAt -__v").exec();

        // Checking if user exists in database
        if (user) {
            const { name, email, bio } = req.body;
            // Updating name / email / bio only if it exists in req.body
            if (name) {
                user.name = name;
            }
            if (email) {
                user.email = email;
            }
            if (bio) {
                user.bio = bio;
            }

            const userData = await user.save();
            if (userData) {
                return res.status(202).json({ name: name, email: email, bio: bio });
            }
            return res.status(403).json({ error: "Failed to update details" });
        }
        return res.status(404).json({ error: "User not found" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}