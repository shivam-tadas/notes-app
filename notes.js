const readline = require('node:readline');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const notes = [
    { id: 1, content: "Learn Node.js" },
    { id: 2, content: "Build something" }
];

const getUserInput = (query) => {
    return new Promise((resolve) => { rl.question(query, resolve); });
}

let runProg = true;

async function runCli() {
    while (runProg) {
        let choice = 0;
        console.log("1. View notes, 2. Add a note, 3. Delete a note, 4. Edit note, 5. Search for a note, 6. Exit");
        choice = parseInt(await getUserInput("Enter your choice: "), 10);
        console.log(`Entered choice is ${choice}`);
        switch (choice) {
            case 1:
                console.log(notes);
                break;
            case 2:
                let newContent = await getUserInput("Enter content for your note: ");
                if (newContent === "") {
                    console.log("No content entered for the new note.");
                    break;
                }
                let newId;
                if (notes.length === 0) {
                    newId = 1;
                } else {
                    newId = Math.max(...notes.map(notes => notes.id)) + 1;
                }
                notes.push({ id: newId, content: newContent });
                break;
            case 3:
                let deleteNoteId = Number(await getUserInput("Enter ID of note to be deleted: "));
                if (Number.isInteger(deleteNoteId) === false) {
                    console.log("Please enter a valid ID")
                    break;
                }
                let deleteNoteIndex = notes.findIndex(item => item.id === deleteNoteId);
                if (deleteNoteIndex !== -1) {
                    notes.splice(deleteNoteIndex, 1);
                } else {
                    console.log("Please enter a valid existing note ID");
                }
                break;
            case 4:
                let editNoteId = Number(await getUserInput("Enter ID of note to edit: "));
                if (Number.isInteger(editNoteId) === false) {
                    console.log("Please enter a valid ID")
                    break;
                }
                let editNoteIndex = notes.findIndex(item => item.id === editNoteId);
                if (editNoteIndex !== -1) {
                    newNoteContent = await getUserInput("Enter new note content: ");
                    if (newNoteContent === "") {
                        console.log("No content entered for the new note.");
                        break;
                    }
                    notes[editNoteIndex].content = newNoteContent;
                } else {
                    console.log("Please enter a valid existing note ID");
                }
                break;
            case 5:
                let searchContent = await getUserInput("Enter what to search for: ");
                if (searchContent === "") {
                    console.log("No content entered to search.");
                    break;
                }
                const matches = notes.filter(
                    note => Object.values(note).some(
                        val => String(val).toLowerCase().includes(searchContent.toLowerCase())
                    )
                );
                console.log(matches);
                break;
            case 6:
                runProg = false;
                break;
            default:
                console.log("Invalid choice entered");
        }
        if (!runProg) {
            rl.close();
            break;
        }
    }
}

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

// runCli();