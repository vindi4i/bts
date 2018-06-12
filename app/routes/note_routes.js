var mongodb = require('mongodb');

module.exports = function(app, db) {

  var ObjectID = require('mongodb').ObjectID;

  //read data
  app.get('/read', (req, res) => {
    const collection = db.collection('tests');
    collection.find({}).toArray(function(err, docs) {
      if(err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(docs);
      }
    });
  });

//add tests
  app.post('/register', (req, res) => {
    const singletest = { DeviceName: req.body.DeviceName, MaxRatioError: req.body.MaxRatioError, EventDate: date(), Data: req.body.Data, VectorGroup: req.body.VectorGroup, SoftwareVersion: req.body.SoftwareVersion };
    db.collection('tests').insert(singletest, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

//delete tests
  app.delete('/delete', (req, res) => {
  console.log('Type ' + typeof req.body._id);
  console.log('Content ' + req.body._id);
  if (typeof req.body._id === 'string') {
    db.collection('tests').deleteOne({_id:new mongodb.ObjectID (req.body._id)}, function (err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Item deleted!');
      }
    });
  }
  else {
    var RecordsToDelete = req.body._id;
    for (var i = 0; i < RecordsToDelete.length; i++) {
      db.collection('tests').deleteOne({_id:new mongodb.ObjectID (RecordsToDelete[i])}, function (err, result) {
        if (err) {
          res.send({'error':'An error has occurred'});
        }
      });
    }
    res.send('Item deleted!');
  }
});

function date(){
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  return datetime;
}
};
