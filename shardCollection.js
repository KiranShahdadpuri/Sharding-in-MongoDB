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
    addShardObject:"a/192.168.0.7:27001",//Doc: 'a' is the name of replica set
    rows:[{name:"abc",age:20},
        {name:"xyz",age:22},
        {name:"pqr",age:30},
        {name:"zxc",age:40},
    ],
    dbName:'dbShard',
    collection:'try'
}

MongoClient.connect('mongodb://'+mongoShard.host+':'+mongoShard.port+'/admin', function(err, db) {
    //Doc: Use the admin database for commands
    var col=db.collection(mongoShard.collection);
    //Doc:Adding collection
    for(var i=0;i<mongoShard.rows.length;i++){
        col.insert(rows[i]);
    }
    //Doc: creating index 
    col.createIndex({'age':1});
    var adminDb = db.admin();
    //Doc: creating indexField variable
    var indexField={};
    indexField[age]=1;
    //Doc:sharding Collection //Note: this will act as range sharding and by specifying "hashed" value in shardkeyField will act as hashed sharding
    adminDb.command({ shardCollection: "dbShard.try", key: indexField }, function(err, info) {
        if(err){
            console.log(+err);
        }
        else{
            console.log(info);
        }
    });

});
