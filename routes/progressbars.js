var Mongo = require('../models/progressbardb');

var Server = Mongo.Server,
    Db = Mongo.Db
    BSON = Mongo.BSON

var db = Mongo.db
 
exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving progressbar: ' + id);
  db.collection('progressbar', function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};
 
exports.findAll = function(req, res) {
  db.collection('progressbar', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};
 
exports.addWine = function(req, res) {
  var progressbar = req.body;
  console.log('Adding progressbar: ' + JSON.stringify(progressbar));
  db.collection('progressbar', function(err, collection) {
    collection.insert(progressbar, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}
 
exports.updateWine = function(req, res) {
  var id = req.params.id;
  //debugger;
  var progressbar = req.body;
  console.log('Updating progressbar: ' + id);
  console.log(JSON.stringify(progressbar));
  db.collection('progressbar', function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, progressbar, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating progressbar: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(progressbar);
      }
    });
  });
}
 
exports.deleteWine = function(req, res) {
  var id = req.params.id;
  console.log('Deleting progressbar: ' + id);
  db.collection('progressbar', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}
