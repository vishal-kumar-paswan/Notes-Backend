const { validationResult } = require('express-validator');
const Note = require("../models/note");
const User = require("../models/user");

// Fetch all notes
exports.fetchNotes = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Checking if user already exists
        // Also populating the notes array if exists
        const user = await User.findById(userId)
            .populate({ path: "notes", model: "Note", select: '-__v -createdAt' }).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Returning the notes array
        const notes = user.notes;
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Fetch note
exports.fetchNote = async (req, res) => {
    try {
        const userId = req.params.userId;
        const noteId = req.params.noteId;

        // Checking if user exists
        const user = await User.findById(userId)
            .populate({ path: "notes", model: "Note", select: '-__v -createdAt' }).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Checking if note exist in the notes array
        // If exists, return the note object
        for (let i = 0; i < user.notes.length; i++) {
            if (user.notes[i]._id.toString() === noteId) {
                return res.status(200).json(user.notes[i]);
            }
        }
        return res.status(404).json({ error: "Note not found" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Add new note
exports.createNote = async (req, res) => {
    try {
        // Checking if req.body contains any errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
            });
        }

        const userId = req.params.userId;

        // Checking if user exists
        const user = await User.findById(userId).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Saving note into the database
        const note = new Note(req.body);
        const noteData = await note.save();

        // Check if note is saved into the database
        if (!noteData) {
            return res.status(403).json({ error: "Failed to create note" });
        }

        // Saving note _id into the notes array
        user.notes.push(noteData._id);
        const userData = await user.save();

        // Check if note is saved into the database
        if (!userData) {
            return res.status(403).json({ error: "Failed to create note" });
        }

        return res.status(201).json({
            _id: noteData._id,
            title: noteData.title,
            description: noteData.description,
            updatedAt: noteData.updatedAt
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Update note
exports.updateNote = async (req, res) => {
    try {
        const userId = req.params.userId;
        const noteId = req.params.noteId;
        const { title, description } = req.body;

        // Checking if user and note exists
        const user = await User.findById(userId).exec();
        const note = await Note.findById(noteId).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Checking if note exist in the notes array
        // and also belongs to the same user
        for (let i = 0; i < user.notes.length; i++) {
            if (user.notes[i].toString() === noteId) {
                // Updating data only if title / description exists in req.body
                if (title) {
                    note.title = title;
                }
                if (description) {
                    note.description = description;
                }
                const noteData = await note.save();

                if (!noteData) {
                    return res.status(400).json({ error: "Failed to update note" });
                }

                return res.status(202).json({
                    _id: noteData._id,
                    title: noteData.title,
                    description: noteData.description,
                    updatedAt: noteData.updatedAt
                });
            }
        }

        // If the note id is not found in user.notes,
        // means note doesnot belong to the particular user
        return res.status(404).json({ error: "Note not found" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Delete note
exports.deleteNote = async (req, res) => {
    try {
        const userId = req.params.userId;
        const noteId = req.params.noteId;

        // Checking if user and note exists
        const user = await User.findById(userId).exec();
        const note = await Note.findById(noteId).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Checking if note exist in the notes array
        // and also belongs to the same user,
        // If yes, then remove the note from the database
        const noteExists = () => {
            console.log("Array len1", user.notes.length);
            for (let i = 0; i < user.notes.length; i++) {
                if (user.notes[i].toString() === noteId) {
                    return true;
                }
            }
            return false;
        }

        console.log("note exists", noteExists());

        if (noteExists()) {
            await Note.findByIdAndRemove(noteId);

            // Removing the ObjectId of the deleted array from the notes array
            const newNotesArray = user.notes.filter((item) => {
                if (item.toString() != noteId) {
                    return item;
                }
            });

            // Updating notes array
            user.notes = newNotesArray;
            const userData = await user.save();

            if (userData) {
                return res.status(202).json({ message: "Note deleted" });
            }
            return res.status(403).json({ error: "Failed to delete note" });
        }
        return res.status(404).json({ error: "Note not found" });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}