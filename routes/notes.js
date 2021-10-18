const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const readFromFile = util.promisify(fs.readFile);


notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    if (req.body) {
        console.log(req.body);
        writeToFile('../db/notes.json', req.body);
    }
    else {
        res.error('Error adding note');
    }
});

module.exports = notes