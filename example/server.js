var express = require('express');
var app = express();

var util = require('util');

app.get('/', function (req, res) {
    res.send(200, {
        message: 'hello world'
    });
});

app.get('/hello/:name', function (req, res) {
    var greeting = util.format('hello %s', req.params.name);
    res.send(200, {
        message: greeting
    });
});

app.post('/hello', function (req, res) {
    var greeting = util.format('hello %s', req.body.name);
    res.send(200, {
        message: greeting
    });
});

var server = app.listen(3000, function () {
    console.log('Example app listening at http://127.0.0.1:3000');
});
