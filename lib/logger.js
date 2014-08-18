var moment = require('moment');

function Logger() {
    'use strict';

    var self = this;

    self.error = function (message) {
        console.log(new Date() + ' - [ERROR]: ' + message);
    };

    self.info = function (message) {
        console.log(new Date() + ' - [INFO]: ' + message);
    };

    self.warn = function (message) {
        console.log(new Date() + ' - [WARN]: ' + message);
    };

}

module.exports = new Logger();