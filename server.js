const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
//const assert         = require('assert');

const app            = express();

const port = 8000;


app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  //assert.equal(null, err);
  if (err) return console.log(err)
  myDB = database.db("btsadb")
  require('./app/routes')(app, myDB);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
