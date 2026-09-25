const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: { type: String },
    createdAt: { type: Date }
});

module.exports = mongoose.model("Note", noteSchema);