var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('winedb', server);

var db = new Db('winedb', new Server("127.0.0.1", 27017, {}), {safe: true});

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'winedb' database");
    db.collection('w', {safe:true}, function(err, collection) {
      console.log("In the db.open function");
      //console.log("The 'w' collection doesn't exist. Creating it with sample data...");
      //populateDB();
      if (err) {
        console.log("The 'w' collection doesn't exist. Creating it with sample data...");
        populateDB();
      } else {
        console.log("Loading db.open was successful");
        //console.log(collection);
      }
    });
  }
});

var populateDB = function() {

  var w = [
    {
      name: "CHATEAU DE SAINT COSME",
      year: "2009",
      grapes: "Grenache / Syrah",
      country: "France",
      region: "Southern Rhone",
      description: "The aromas of fruit and spice...",
      picture: "saint_cosme.jpg"
    },
    {
      name: "LAN RIOJA CRIANZA",
      year: "2006",
      grapes: "Tempranillo",
      country: "Spain",
      region: "Rioja",
      description: "A resurgence of interest in boutique vineyards...",
      picture: "lan_rioja.jpg"
    }
  ];

  db.collection('w', function(err, collection) {
    collection.insert(w, {safe:true}, function(err, result) {});
  });

};

this.Server = Server;
this.Db = Db;
this.BSON = BSON;
this.db = db;
