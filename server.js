// Dependencies......

const express = require('express');

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const { addNewNote, deleteNote } = require('./lib/notes');
const { notes } = require("./db/db");


// Routes......

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = addNewNote(req.body, notes);
    res.json(newNote); 
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.send();
})


// Listener.....

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});