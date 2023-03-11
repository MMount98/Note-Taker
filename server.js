const express = require("express");
const path = require("path");
const route = require(`./routes/index.js`);

const PORT = process.env.PORT || 3001;

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(PORT, () => console.log(`App listening on 3001`));
