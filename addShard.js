var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSet = require('mongodb').ReplSet,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');
var mongoShard={
    host:'192.168.0.7',
    port:27017,//Doc:port of mongos
    addShardObject:"a/192.168.0.7:27001"
};
MongoClient.connect('mongodb://'+mongoShard.host+':'+mongoShard.port+'/admin', function(err, db) {
    console.log(".....");
    // Use the admin database for commands
    var adminDb = db.admin();
    console.log(".....Going");
    // Doc:Add Shard
    adminDb.command({ addShard: mongoShard.addShardObject}, function(err, info) {
       if(err){
        console.log(err);
       }
       console.log(info);
    });
});
