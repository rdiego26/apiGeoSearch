/**
 * Created by ramos on 29/09/15.
 */
var express  = require('express'),
    constants = require('../utils/Constants'),
    geoSearchController = require('../controller/geoSearch'),
    _result = require('../utils/Result');

/* App Configuration */
var app = express();
app.set('port', constants.server.port);
app.set('title', constants.app.name);


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
    res.status(404).end();
});


module.exports = app;