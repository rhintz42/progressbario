var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;


var db = new Db('progressbardb', new Server("127.0.0.1", 27017, {}), {safe: true});

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'progressbardb' database");
    db.collection('progressbar', {safe:true}, function(err, collection) {
      console.log("In the db.open function");
      //console.log("The 'progressbar' collection doesn't exist. Creating it with sample data...");
      //populateDBWithProgressbars();
      if (err) {
        console.log("The 'progressbar' collection doesn't exist. Creating it with sample data...");
        populateDB();
      } else {
        console.log("Loading db.open was successful");
        //console.log(collection);
      }
    });
  }
});

var populateDBWithProgressbars = function() {

  var progressbars = [
    {
      name: "CHATEAU DE SAINT COSME",
      type: "default",
      goal_min: "0",
      goal_max: "200",
      current_point: "100",
      has_ticks: "true",
      num_ticks: "10",
      description: "Progressbar for blah blah blah"
    },
    {
      name: "LAN RIOJA CRIANZA",
      type: "default",
      goal_min: "0",
      goal_max: "2000",
      current_point: "150",
      has_ticks: "false",
      description: "Progressbar for blah blah blah"
    }
  ];

  db.collection('progressbar', function(err, collection) {
    collection.insert(progressbars, {safe:true}, function(err, result) {});
  });

};

this.Server = Server;
this.Db = Db;
this.BSON = BSON;
this.db = db;
