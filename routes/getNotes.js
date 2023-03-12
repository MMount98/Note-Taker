const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils.js");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
  };

  readAndAppend(newNote, "./db/db.json");
});

module.exports = notes;
