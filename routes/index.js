//MODULES
const express = require("express");

// //Import custom modular routers
const getNotesRouter = require("./getNotes");

//VARIBLE
const app = express();

//MIDDLEWARE
app.use("/notes", getNotesRouter);

//EXPORTING
module.exports = app;
