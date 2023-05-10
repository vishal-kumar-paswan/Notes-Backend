const Note = require("../models/note");
const { validationResult } = require('express-validator');

// Fetch all notes
exports.fetchAllNotes = async (req, res) => {
    try {
        const notesArray = await Note.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
        return res.status(200).json(notesArray);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to fetch notes" });
    }
}

// Add new note
exports.addNote = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
            });
        }

        const newNote = new Note(req.body);

        newNote.save().then(() => {
            return res.status(200).json({ message: "Note added" });
        });
    } catch (error) {
        return res.status(400).json({ message: "Failed to save note" });
    }
}

// Add new note
exports.readNote = async (req, res) => {
    try {
        const _id = req.params.noteId;
        const noteExists = await Note.exists({ _id: _id });

        if (noteExists) {
            let note = await Note.findById(_id);
            return res.status(200).json({ title: note.title, description: note.description });
        } else {
            return res.status(400).json({ error: "Note doesn't exists in DB" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Failed to read note" });
    }
}


// Update note
exports.updateNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        const _id = req.params.noteId;
        const noteExists = await Note.exists({ _id: _id });

        if (noteExists) {
            let updateNote = await Note.findById(_id);
            updateNote.title = title;
            updateNote.description = description;
            await updateNote.save();
            return res.status(200).json({ message: "Note updated" });
        } else {
            return res.status(400).json({ error: "Note doesn't exists in DB" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Failed to update note" });
    }
}

// Delete note
exports.deleteNote = async (req, res) => {
    try {
        const _id = req.params.noteId;
        const noteExists = await Note.exists({ _id: _id });

        if (noteExists) {
            Note.findByIdAndRemove(_id)
                .then(() => res.status(200).json({ message: "Note deleted" }));
        } else {
            return res.status(400).json({ error: "Note doesn't exists in DB" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Failed to delete note" });
    }
}