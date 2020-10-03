const fs = require("fs");
const path = require("path");
// package installed from NPM library to generate a unique ID.  Package is called 'shortid'
const shortid = require('shortid');


function addNewNote (body, notesArray) {
    const newNote = body;
    newNote.id = shortid.generate();

    notesArray.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return newNote;
}

function deleteNote (idRemove, notesArray){
    // Something about this delete function just does not seem to work
    
    newNotesArray = notesArray.filter(note => note.id != idRemove)

    fs.writeFile(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: newNotesArray }, null, 2),
        (err) => {
            if (err) {
                console.log(err); 
            } else { 
                console.log("File written successfully\n"); 
                console.log("The file written has the following contents:"); 
                console.log(fs.readFileSync(path.join(__dirname, '../db/db.json'), "utf8")); 
            }   
        }
    );

    return newNotesArray;
}

module.exports = {
    addNewNote,
    deleteNote
  };