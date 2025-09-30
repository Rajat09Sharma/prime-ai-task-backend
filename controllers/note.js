const Note = require("../models/note");


const getAllNotesHandler = async (req, res) => {
    try {

        const notes = await Note.find().sort();
        return res.status(200).json({ message: "All notes fetched successfully.", notes });

    } catch (error) {

        console.log("Get all notes handler error", error);
        return res.status(500).json({ message: "Server error, failed to fetch all notes." });

    }
}

const createNoteHandler = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const note = await Note.create({ title, description, userId: req.user.id });
        return res.status(201).json({ message: "Note created successfully.", note });

    } catch (error) {

        console.log("create  note handler error", error);
        return res.status(500).json({ message: "Server error, failed to create the note." });
    }
}

const getNoteByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {

        const note = await Note.findOne({ _id: id });
        return res.status(200).json({ message: "Note fetched successfully.", note });

    } catch (error) {
        console.log("get note by id handler error", error);
        return res.status(500).json({ message: "Server error, failed to fetched the note." });
    }
}

const updateNoteHandler = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {

        const note = await Note.findOneAndUpdate({ _id: id }, { title, description });
        console.log(note);

        return res.status(201).json({ message: "Note updated successfully.", note });

    } catch (error) {
        console.log("update note handler error", error);
        return res.status(500).json({ message: "Server error, failed to update the note." });
    }
}

const deleteNoteHandler = async (req, res) => {
    const { id } = req.params;

    try {

        const note = await Note.findOneAndDelete({ _id: id });
        return res.status(201).json({ message: "Note deleted successfully.", note });

    } catch (error) {
        console.log("delete note handler error", error);
        return res.status(500).json({ message: "Server error, failed to delete the note." });
    }
}


module.exports = {
    getAllNotesHandler,
    createNoteHandler,
    getNoteByIdHandler,
    updateNoteHandler,
    deleteNoteHandler
}