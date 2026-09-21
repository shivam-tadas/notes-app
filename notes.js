const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const notes = [
    { id: 1, content: "Learn Node.js" },
    { id: 2, content: "Build something" }
];

app.get('/', (req, res) => {
    res.json({ "message": "Hello world" });
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.get('/notes/:id', (req, res) => {
    const noteId = Number(req.params.id);
    if (Number.isInteger(noteId)) {
        const note = notes.find(note => note.id === noteId);
        if (!note) {
            return res.status(404).json({ "message": `Note with ID ${noteId} not found` });
        }
        res.json(note);
    } else {
        res.status(400).json({ "message": "Invalid ID entered" });
    }
});

app.delete('/notes/:id', (req, res) => {
    const deleteNoteId = Number(req.params.id);
    if (Number.isInteger(deleteNoteId)) {
        const note = notes.find(note => note.id === deleteNoteId);
        if (!note) {
            return res.status(404).json({ "message": `Note with ID ${deleteNoteId} not found` });
        }
        const deleteNoteIndex = notes.findIndex(note => note.id === deleteNoteId);
        notes.splice(deleteNoteIndex, 1);
        return res.status(200).json({ "message": `Note with ID ${deleteNoteId} deleted` });
    }
    res.status(400).json({ "message": "Invalid ID entered" });
});

app.post('/notes', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ "error": "content is required" });
    }
    let newNoteId;
    if (notes.length === 0) {
        newNoteId = 1;
    } else {
        newNoteId = Math.max(...notes.map(notes => notes.id)) + 1;
    }
    const newNote = {
        id: newNoteId,
        content: content
    };
    notes.push(newNote);
    res.status(201).json({ "message": "New note created successfully" });
});

app.put('/notes/:id', (req, res) => {
    const editNoteId = Number(req.params.id);
    if (!Number.isInteger(editNoteId)) {
        res.send("Invalid ID entered");
        return;
    }
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ "error": "content is required" });
    }
    const editNoteIndex = notes.findIndex(note => note.id === editNoteId);
    if (editNoteIndex === -1) {
        return res.status(404).json({ "message": `Note with ID ${editNoteId} not found` });
    }
    notes[editNoteIndex] = { id: editNoteId, content };
    res.json({ "message": `Note updated successfully` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});