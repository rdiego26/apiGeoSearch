/**
 * @author Diego Ramos
 * Created on 14/02/14.
 * @desc
 */

var _  = require('underscore'),
    constants = require('../utils/Constants'),
    querystring = require('querystring'),
    _result = require('../utils/Result');

/**
 * Query Google Maps API for attempt get address.
 * @param res
 * @param res
 */
exports.searchByFieldAddress = function(req, res, callback) {

    var _blackListFields = ['types', 'place_id'];
    var _filter = {sensor:false};


    if(req.params.address) {
        _filter = _.extend(_filter, {address:req.params.address});
    }

    var http = require('http');
    var options = {
        hostname: 'maps.googleapis.com',
        port: 80,
        path: '/maps/api/geocode/json?' + querystring.stringify(_filter),
        method: 'GET'
    };


    //Reset previous data
    _result.data = [];

    var _request = http.request(options, function(resp) {

        var _responseString = '';

        resp.on('data', function(data) {
            _responseString += data;
        });

        resp.on('end', function() {
            var _resultResponse = JSON.parse(_responseString);

            if(_resultResponse.status === "OK") {
                _.each(_resultResponse.results, function(d) {
                    var tmpObj = {};
                    tmpObj = _.omit(d, _blackListFields);
                    _result.data.push(tmpObj);
                });
            }

            callback(req, res);

        });

    });
    _request.end();


}


/**
 * Query Google Maps API for attempt get address.
 * @param res
 * @param res
 */
exports.searchByLatLng = function(req, res, callback) {

    var _blackListFields = ['types'];
    var _filter = {sensor:false};

    //Include latitude and longitude
    _filter = _.extend(_filter, {latlng:req.params.lat+','+req.params.lng} );

    var http = require('http');
    var options = {
        hostname: 'maps.googleapis.com',
        port: 80,
        path: '/maps/api/geocode/json?' + querystring.stringify(_filter),
        method: 'GET'
    };


    //Reset previous data
    _result.data = [];

    var _request = http.request(options, function(resp) {

        var _responseString = '';

        resp.on('data', function(data) {
            _responseString += data;
        });

        resp.on('end', function() {
            var _resultResponse = JSON.parse(_responseString);

            if(_resultResponse.status === "OK") {
                _.each(_resultResponse.results, function(d) {
                    var tmpObj = {};
                    tmpObj = _.omit(d, _blackListFields);
                    _result.data.push(tmpObj);
                });
            }

            callback(req, res);

        });

    });
    _request.end();


};

/**
 * Set data on result.
 * @param req
 * @param res
 */
exports.setData = function(req, res) {

    _result.status = constants.http.ok;
    res.end( JSON.stringify(_result) );

};