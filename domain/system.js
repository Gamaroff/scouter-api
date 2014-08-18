var CONFIG = require('config').ScouterDb;
var mongoose = require('mongoose');

var logger = require('../lib/logger');

var logModel = require('./system/models/logModel');
var userModel = require('./system/models/userModel');

function ScouterDb() {
    'use strict';

    var self = this;

    self.models = {};

    self.init = function (callback) {
        var options = {
            db    : { safe: true },
            server: {
                auto_reconnect: true,
                socketOptions : {
                    keepAlive: 1
                }
            }
        };

        var db = mongoose.createConnection(CONFIG.host, CONFIG.db, CONFIG.port, options);

        db.on('error', function () {
            if (callback) {
                callback(false);
            }
            logger.error('Error connecting to ' + CONFIG.db + ' on ' + CONFIG.host + ':' + CONFIG.port);
        });
        db.once('open', function () {
            logger.info('Connected to ' + CONFIG.db + ' on ' + CONFIG.host + ':' + CONFIG.port);

            self.models = {
                log : new logModel(db),
                user: new userModel(db)
            };

            if (callback) {
                callback(true);
            }

        });
    };
}

module.exports = new ScouterDb();