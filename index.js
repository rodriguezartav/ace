#!/usr/bin/env node
var express  = require('express');
var argv     = require('optimist').argv;
var resolve  = require('path').resolve;

var path = resolve(argv._[0] || process.cwd());
var port = argv.p || argv.port || process.env.PORT || 9294;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

server = express.createServer();
server.use(allowCrossDomain);


server.get('/cache.manifest', function(req, res){
    res.header('Content-Type', 'text/cache-manifest');
    res.sendfile('./public/manifest');
});

server.use(express.static('./public'));
server.listen(port);

console.log('Started server on: ' + port);