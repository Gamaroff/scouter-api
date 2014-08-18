var appConfig = require('config').App;
var redis = require('./domain/redis/api');
var expressJwt = require('express-jwt');
var userApi = require('./api/system/userApi');

function RoutingModule() {
    'use strict';

    var self = this;

    self.init = function (server) {

        server.get('/', function (req, res) {
            res.json({app: '1.0.12'});
        });

        server.post('/api/users', function (req, res) {
            userApi.saveUser(req.body, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.get('/api/users', function (req, res) {
            userApi.getUsers(function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.get('/api/users/:user_id', function (req, res) {
            userApi.getUser(req.params, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.get('/api/users/organisation/:org_id', function (req, res) {
            userApi.getOrganisationUsers(req.params, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.post('/api/users/login', function (req, res) {
            userApi.login(req.body, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.post('/api/users/activate', function (req, res) {
            userApi.activate(req.body, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.post('/api/users/activated', function (req, res) {
            userApi.activated(req.body, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.post('/api/users/request_reset', function (req, res) {
            userApi.requestReset(req.body, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.post('/api/users/reset', function (req, res) {
            userApi.reset(req.body, function (err, result) {
                res.json({err: err, result: result});
            });
        });
        server.get('/api/users/reset/:reset_code', function (req, res) {
            userApi.canReset(req.params, function (err, result) {
                res.json({err: err, result: result});
            });
        });

    };

}

module.exports = new RoutingModule();