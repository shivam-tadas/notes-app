require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/Note');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoose()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }).catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });

async function connectMongoose() {
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
    });
}

// test1 = async function name(params) {
//     await Note.create({ content: "Test note 1", createdAt: Date() });
// }

// test1();

app.get('/', (req, res) => {
    res.json({ "message": `Hello ${process.env.HELLO}` });
});

app.get('/notes', async(req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ "message": "Error retrieving notes" });
    }
});

app.get('/notes/:id', (req, res) => {

});

app.delete('/notes/:id', (req, res) => {

});

app.post('/notes', (req, res) => {

});

app.put('/notes/:id', (req, res) => {

});