const express = require("express");
const { getAllNotesHandler, createNoteHandler, getNoteByIdHandler, updateNoteHandler, deleteNoteHandler } = require("../controllers/note");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/", authMiddleware, getAllNotesHandler);
router.post("/", authMiddleware, createNoteHandler);
router.get("/:id", authMiddleware, getNoteByIdHandler);
router.patch("/:id", authMiddleware, updateNoteHandler);
router.delete("/:id", authMiddleware, deleteNoteHandler);


module.exports = { notesRouter: router };