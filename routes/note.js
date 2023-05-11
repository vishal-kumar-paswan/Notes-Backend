const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { createNote, fetchNotes, deleteNote, updateNote, fetchNote } = require("../controllers/note");
const { isSignedin } = require("../controllers/auth");

// Routes
router.get("/notes/:userId", isSignedin, fetchNotes);
router.get("/note/:userId/:noteId", isSignedin, fetchNote);
router.post("/create-note/:userId",
    [
        check("title", "title is required").isLength({ min: 1 }),
        check("title", "title does not exists").exists(),
        check("description", "description does not exists").exists(),
        check("description", "description is required").isLength({ min: 1 })
    ],
    isSignedin, createNote
);
router.put("/update-note/:userId/:noteId", isSignedin, updateNote);
router.delete("/delete-note/:userId/:noteId", isSignedin, deleteNote);

module.exports = router;