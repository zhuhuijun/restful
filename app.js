var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var db = require('./db');
var urlutil = require('url');
var server = http.createServer(function (req, res) {
    var method = req.method;
    var url = req.url;
    var urlobj = urlutil.parse(req.url, true);//true表示把查询字符串转化成
    var urlpathname = urlobj.pathname;
    if (urlpathname == '/') {
        fs.createReadStream('./app/index.html').pipe(res);
    } else {
        var pathname = path.join(__dirname, url);
        fs.exists(pathname, function (exists) {
            if (exists) {
                res.writeHead(200, {'Content-Type': mime.lookup(urlpathname)});
                fs.createReadStream(pathname).pipe(res);
            } else if (urlpathname == '/user') {
                var userdata = {};
                req.on('data', function (data) {
                    userdata = JSON.parse(data.toString());
                    console.log(userdata);

                });
                switch (method) {
                    case'POST':
                        req.on('end', function () {
                            db.insert(userdata, function (err, ret) {
                                res.end(JSON.stringify([userdata]))
                            });
                        });
                        break;
                    case 'DELETE'://删除资源
                        var myid = urlobj.query._id;
                        db.delete(myid, function (err, ret) {
                            res.end(JSON.stringify([
                                {username: 'deleted'}
                            ]))
                        });
                        break;
                    case 'GET'://获得资源
                        db.list({}, function (err, ret) {
                            res.end(JSON.stringify(ret))
                        });
                        break;
                    case 'PUT'://修改资源
                        console.dir(userdata);
                        db.update(userdata, function (err, ret) {
                            res.end(JSON.stringify([userdata]))
                        });
                        break;
                }

            } else {
                res.end(404, {'Content-Type': mime.lookup(urlpathname)});
            }

        });
    }
});
server.listen(8080);
