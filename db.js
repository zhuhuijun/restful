var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://127.0.0.1:28017/rest';
exports.insert = function (user, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user').save(user, function (err, ret) {
            db.close();
            callback(null, ret);
        })
    });
}