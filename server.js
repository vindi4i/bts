const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

const port = 8000;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

MongoClient.connect(db.url, (err, database) => {
  //assert.equal(null, err);
  if (err) return console.log(err)
  myDB = database.db("btsadb")
  require('./app/routes')(app, myDB);

/*  app.listen(port, () => {
    console.log('We are live on ' + port);*/
    app.listen(server_port, server_ip_address, function () {
        console.log('We are live on ' + server_port);
  });
});
