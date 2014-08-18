function RedisApi() {
    'use strict';

    var self = this;
    var Client = null;

    self.init = function (client) {
        Client = client;
    };

    self.getHash = function (key, callback) {
        if (Client) {
            Client.hgetall(key, function (err, result) {
                if (callback) {
                    callback(err, result);
                }
            });
        }
    };

    self.setHash = function (key, items, callback) {
        if (Client) {
            Client.hmset(key, items, function (err, result) {
                if (callback) {
                    callback(err, result);
                }
            });
        }
    };

    self.getSet = function (key, callback) {
        if (Client) {
            Client.smembers(key, function (err, result) {
                if (callback) {
                    callback(err, result);
                }
            });
        }
    };

    self.addItemToSet = function (key, item, callback) {
        if (Client) {
            Client.sadd(key, item, function (err, result) {
                if (callback) {
                    callback(err, result);
                }
            });
        }
    };

    self.removeItemFromSet = function (key, item, callback) {
        if (Client) {
            Client.srem(key, item, function (err, result) {
                callback(err, result);
            });
        }
    };

    self.isMember = function (setName, value, callback) {
        if (Client) {
            Client.sismember(setName, value, function (err, result) {
                callback(err, result);
            });
        }
    };

    self.remove = function (setName, value, callback) {

        if (Client) {
            Client.srem(setName, value, function (err, result) {
                callback(err, result);
            });
        }
    };

    self.count = function (setName, callback) {
        if (Client) {
            Client.scard(setName, function (err, result) {
                callback(err, result);
            });
        }
    };

}
module.exports = new RedisApi();