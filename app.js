var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var db = require('./db');
var server = http.createServer(function (req, res) {
    var method = req.method;
    var url = req.url;
    if (url == '/') {
        fs.createReadStream('./app/index.html').pipe(res);
    } else {
        var pathname = path.join(__dirname, url);
        fs.exists(pathname, function (exists) {
            if (exists) {
                res.writeHead(200, {'Content-Type': mime.lookup(pathname)});
                fs.createReadStream(pathname).pipe(res);
            } else if (url == '/user') {
                var userdata = [];
                req.on('data', function (data) {
                    userdata = JSON.parse(data.toString());
                    console.log(userdata);

                });
                req.on('end', function () {
                    db.insert(userdata, function (err, ret) {
                        res.end(JSON.stringify([userdata]))
                    });
                });
            } else {
                res.end(404, {'Content-Type': mime.lookup(pathname)});
            }

        });
    }
});
server.listen(8080);
