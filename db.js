var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://127.0.0.1:28017/rest';
exports.insert = function (user, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user').save(user, function (err, ret) {
            db.close();
            callback(null, ret);
        })
    });
};
exports.delete = function (_id, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user').remove({_id: new ObjectId(_id) }, function (err, ret) {
            db.close();
            callback(null, ret);
        })
    });
};
exports.list = function (para, callback) {
    MongoClient.connect(url, function (err, db) {
        db.collection('user').find({}).toArray(function (err, ret) {
            db.close();
            callback(null, ret);
        });
    });
};
exports.update = function (para, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        db.collection('user').update({_id: new ObjectId(para._id) }, {userpwd: para.userpwd}, function (err, ret) {
            db.close();
            callback(null, ret);
        })
    });
};