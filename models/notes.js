const mongoose = require("mongoose");

// Defining Note schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);