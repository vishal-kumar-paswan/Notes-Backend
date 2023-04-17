const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const { addNote, fetchAllNotes, deleteNote, updateNote, readNote } = require("../controllers/notes");

// Routes
router.get("/fetch-notes", fetchAllNotes);
router.post("/create-note",
    [
        body("title", "title does not exists").exists(),
        body("title", "title is required").isLength({ min: 1 }),
        body("description", "description does not exists").exists(),
        body("description", "description is required").isLength({ min: 1 })
    ]
    , addNote);
router.get("/read-note/:noteId", readNote);
router.put("/update-note/:noteId", updateNote);
router.delete("/delete-note/:noteId", deleteNote);

module.exports = router;