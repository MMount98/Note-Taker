//MODULES
const fs = require("fs");
const util = require("util");

//Setting readForFile to Promise obj
const readFromFile = util.promisify(fs.readFile);

/**
 * Function will write to a passed JSON if passed data is a stringfied
 * @param {string} file file that will be written too
 * @param {object} value the append information
 */

const writeToFile = (file, value) =>
  fs.writeFile(file, JSON.stringify(value, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${file}`)
  );

/**
 * Function will read a passed file and append a passed value to it
 * @param {object} value The value you want to append
 * @param {string} file The path to the desired file
 */

const readAndAppend = (value, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(value);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
