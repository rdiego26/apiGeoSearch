/**
 * @author Diego Ramos
 * Created on 14/02/14.
 * @desc
 */
'use strict';

//Modules dependencies
var express  = require('express'),
    http = require('http');


var constants = require('./utils/Constants');
var geoSearchController = require('./controller/geoSearch');
var _result = {status:{}, date:new Date(), data:[]};

/* App Configuration */
var app = express();
app.set('port', constants.server.port);
app.set('title', 'apiGeoSearch');


/* Include CORS and JSON Type on ALL res's  */
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Content-type', constants.header.json);
    res.removeHeader("X-Powered-By"); //Remove header for safety reasons
    next();
});


app.get('/:address', function(req, res) {
    geoSearchController.searchByFieldAddress(req, res, geoSearchController.setData);
});

app.get('/:lat/:lng', function(req, res) {
    geoSearchController.searchByLatLng(req, res, geoSearchController.setData);
});

//DEFAULT ROUTE
app.get( '*' , function(req, res) {
    res.writeHead(constants.http.notFound, constants.header.json);
    _result.status = constants.http.notFound;
    res.end(JSON.stringify(_result));
});

http.createServer(app).listen(app.get('port'), function() {
    console.log(app.get('title') + ' listening on port ' + app.get('port'));
});