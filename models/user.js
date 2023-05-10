const mongoose = require("mongoose");

// Defining User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        default: null,
        trim: true
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Note",
        default: []
    }
}, { timestamps: true });

// Defining userSchema methods
userSchema.methods = {
    authenticate: function (password) {
        return password === this.password
    },
};

module.exports = mongoose.model("User", userSchema);