module.exports = function(app, db) {

  var ObjectID = require('mongodb').ObjectID;

  app.get('/read', (req, res) => {
    const collection = db.collection('tests');
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs)
      //callback(docs);
    });
  });

  app.post('/register', (req, res) => {
    const singletest = { id: req.body.id, DeviceName: req.body.DeviceName, MaxRatioError: req.body.MaxRatioError };
    db.collection('tests').insert(singletest, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
