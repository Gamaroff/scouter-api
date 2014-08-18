var appConfig = require('config').App;
var redisConfig = require('config').Redis;
var redis = require('./domain/redis');
var scouterDb = require('./domain/system');
var routing = require('./routing');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('./lib/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cors = require('cors')

function Web() {
    'use strict';

    var self = this;

    var app = express();
    app.use(favicon());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({ store: new RedisStore({
        host  : redisConfig.host,
        prefix: 'api-session:scouter-api:'
    }), secret             : redisConfig.secret,
        saveUninitialized  : true,
        resave             : true }));
    app.use(cors());
    app.set('port', process.env.PORT || appConfig.port);

    // development error handler will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                result: err.message,
                err   : err
            });
        });
    }

    // production error handler no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            result: err.message,
            err   : {}
        });
    });

    self.setup = function (callback) {
        var server = app.listen(app.get('port'), function () {
            logger.info('Express server listening on port ' + server.address().port);
        });

        redis.init(function (success) {

            if (!success && callback) {
                callback('Redis Init failed');
                return;
            }

            scouterDb.init(function (success) {

                if (!success && callback) {
                    callback('System DB Init failed');
                    return;
                }

                routing.init(app);

                if (callback) {
                    callback(null, true);
                }

                // catch 404 and forward to error handler
                app.use(function (req, res, next) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                });
            });
        });
    };

}

module.exports = new Web();