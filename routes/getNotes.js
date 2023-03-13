//MODULES
const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils.js");

//ROUTES

//GET - this route is responsible for sending the database to front end to be displyed in saved noted
notes.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

//GET - this route is responsible for displaying the active Not
notes.get("/:note_id", (req, res) => {
  //noteId is set to the vaule of the requested note id
  const noteId = req.params.note_id;
  //this function read the desired file from database
  readFromFile("./db/notes.json")
    //converting into object
    .then((data) => JSON.parse(data))
    //set getNote to the a filter method that will read through given obj and return the match id if fails to find matching id it will return a string
    .then((json) => {
      const getNote = json.filter((note) => note.id === noteId);
      return getNote.legnth > 0
        ? res.json(getNote)
        : res.json("Failed to Find Note");
    });
});

//POST - this route is responsible for taking in user input and saving to database
notes.post("/", (req, res) => {
  //obj decontruction to pull disred key:value
  const { title, text } = req.body;

  //constructs the new note obj from user input and sets a random value
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    //calls the readAndAppend function and pass the new obj and appends to disered file path
    readAndAppend(newNote, "./db/notes.json");
    res.json(`Added '${newNote.title}' to Data Base!`);
  } else {
    res.error(`Issue adding '${newNote.title}' to Data Base!`);
  }
});

//DELETE - this route is responsible for deleting a desired note/obj from database
notes.delete("/:note_id", (req, res) => {
  //noteId is set to the vaule of the requested note id
  const noteId = req.params.note_id;

  //calls readFromFile function with desired file
  readFromFile("./db/notes.json")
    //creates a obj from stringed file
    .then((data) => JSON.parse(data))
    //newDn is set to filter through passed obj to remove the mathing obj
    .then((notes) => {
      const newDb = notes.filter((notes) => notes.id !== noteId);
      //passes newly edited obj with a disred file path overwriting the last file
      writeToFile("./db/notes.json", newDb);
      //response with success
      res.json(`Note: Deleted`);
    });
});

//EXPROTS
module.exports = notes;
