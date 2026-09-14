const readline = require('node:readline');

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

var runProg = true;

async function main() {
    while (runProg) {
        let choice = 0;
        console.log("1. View notes, 2. Add a note, 3. Delete a note, 4. Edit note, 5. Search for a note, 6. Exit");
        choice = parseInt(await getUserInput("Enter your choice: "), 10);
        console.log(`Entered choice is ${choice}`);
        let noteIndex = -1;
        switch (choice) {
            case 1:
                console.log(notes);
                break;
            case 2:
                newContent = await getUserInput("Enter content for your note: ");
                if (newContent === "") {
                    console.log("No content entered for the new note.");
                    break;
                }
                var newId;
                if (notes.length === 0) {
                    newId = 1;
                } else {
                    newId = Math.max(...notes.map(notes => notes.id)) + 1;
                }
                notes.push({ id: newId, content: newContent });
                break;
            case 3:
                deleteNoteId = Number(await getUserInput("Enter ID of note to be deleted: "));
                if (Number.isInteger(deleteNoteId) === false) {
                    console.log("Please enter a valid ID")
                    break;
                }
                noteIndex = notes.findIndex(item => item.id === deleteNoteId);
                if (noteIndex !== -1) {
                    notes.splice(noteIndex, 1);
                } else {
                    console.log("Please enter a valid existing note ID");
                }
                break;
            case 4:
                editNoteId = Number(await getUserInput("Enter ID of note to edit: "));
                if (Number.isInteger(editNoteId) === false) {
                    console.log("Please enter a valid ID")
                    break;
                }
                noteIndex = notes.findIndex(item => item.id === editNoteId);
                if (noteIndex !== -1) {
                    newNoteContent = await getUserInput("Enter new note content: ");
                    if (newNoteContent === "") {
                        console.log("No content entered for the new note.");
                        break;
                    }
                    notes[noteIndex].content = newNoteContent;
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

main();