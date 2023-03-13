//MODULES
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

//PORTS
const PORT = process.env.PORT || 3001;

//VARIBLE
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));

//ROUTES
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/404.html"));
});

//TURN ON SERVER
app.listen(PORT, () => console.log(`App listening on 3001`));
