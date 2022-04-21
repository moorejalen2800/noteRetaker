const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");



const app = express();
var PORT = process.env.PORT || 3001;


//middlewear
app.use(express.urlencoded( { extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Setting routs for apis
app.get("/api/notes",(req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    res.json(notes)
});

// post funcation to add new notes 
app.post("/api/notes",(req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(newNotes)
});


//used fir deletig 
app.delete("/api/notes",(req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote)
    
})

app.get("/notes", function (req, res ){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//calls home page
app.get("*", function (req, res ){
    res.sendFile(path.join(__dirname, "/public/index.html"));

});



app.listen(PORT, function() {
    console.log("app listening on PORT: " + PORT);
});


