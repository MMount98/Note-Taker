const express = require("express");

// //Import custom modular routers
const getNotesRouter = require("./getNotes");

const app = express();

app.use("/notes", getNotesRouter);

module.exports = app;
