var logger = require('../lib/logger');
var redis = require('redis');
var CONFIG = require('config').Redis;
var api = require('./redis/api');

function Redis() {
    'use strict';

    var self = this;

    self.init = function (callback) {

        var client = redis.createClient(CONFIG.port, CONFIG.host, {auth_pass: CONFIG.password});

        client.on('connect', function () {
            logger.info('Connected to Redis on ' + CONFIG.host + ':' + CONFIG.port);
            api.init(client);

            if (callback) {
                callback(true);
            }

        });

        client.on('error', function (err) {
            logger.info('NOT connected to Redis: ' + err);
            if (callback) {
                callback(false);
            }
        });
    };


}

module.exports = new Redis();
