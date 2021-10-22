const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const { readFromFile, readAndAppend, writeToFile, touch } = require('../helpers/fsUtils');
const fileDb = './db/notes.json';
let filechk = false;

notes.get('/', (req, res) => {
  if (fs.existsSync(fileDb)) {
  console.info(`${req.method} request received for notes`);
  readFromFile(fileDb)
  .then((data) => res.json(JSON.parse(data)));
  }
  else {
      res.send("File db not found");
  }
});

notes.delete('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(fileDb));
    //console.log(data);
    console.log(req.params.id);
    data.find((item, index) => {
        if (item.id === req.params.id) {
            data.splice(index, 1);
            writeToFile(fileDb, data);
        }
    })
    res.json(true);
})

notes.post('/', (req, res) => {
    if (fs.existsSync(fileDb)) {
        console.log("file exists")
        filechk = true;
    }
    else {
        console.log("file does not exist");
        filechk = false;
        fs.closeSync(fs.openSync(fileDb, 'w'));
    }

    if (req.body) {
        if (filechk) {
            readAndAppend(req.body, fileDb);
        }
        else {    
            req.body = [req.body];
            writeToFile(fileDb, req.body)
        }
    }
    else {
        res.error('Error adding note');
    }
}); //end notes.post

module.exports = notes