const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils.js");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const getNote = json.filter((note) => note.id === noteId);
      return getNote.legnth > 0
        ? res.json(getNote)
        : res.json("Failed to Find Tip");
    });
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Added '${newNote.title}' to Data Base!`);
  } else {
    res.error(`Issue adding '${newNote.title}' to Data Base!`);
  }
});

notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  console.log(noteId);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => {
      const newDb = notes.filter((notes) => notes.id !== noteId);

      writeToFile("./db/db.json", newDb);

      res.json(`Note: Deleted`);
    });
});

module.exports = notes;
