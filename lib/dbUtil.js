//This is a DB utility module.. Currently it supports MongoDB but will support others soon

var cloudfoundry = require('cloudfoundry');
var mongodb = require('mongodb').Db;

module.exports = {
    connect: function(dbType, dbServiceName, callback) {
        if (dbType == 'mongodb') {
            mongodb.connect(getMongoUrl(dbServiceName),
            function(err, conn) {
                if (err) {
                    callback(err);
                } else {
                    callback('', conn);
                }
            });
        }
    }
};

function getMongoUrl(dbServiceName) {
    var mongoUrl;
    //default
    var credentials = {
        "hostname": "localhost",
        "port": 27017,
        "username": "",
        "password": "",
        "name": "",
        "db": "test"
    }
    if (cloudfoundry.cloud && cloudfoundry.mongodb && cloudfoundry.mongodb[dbServiceName]) {
        credentials = cloudfoundry.mongodb[dbServiceName].credentials;
    }
    if (credentials.username && credentials.password) {
        mongoUrl = "mongodb://" + credentials.username + ":" + credentials.password + "@" + credentials.hostname + ":" + credentials.port + "/" + credentials.db;
    }
    else {
        mongoUrl = "mongodb://" + credentials.hostname + ":" + credentials.port + "/" + credentials.db;
    }
    console.log(mongoUrl);
    return mongoUrl;
}