var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var self = this;

    var Schema = new mongoose.Schema({
        date_stamp: { type: Number, index: true },
        data      : Object,
        message   : { type: String, index: true },
        type      : { type: String, index: true }
    });

    return db.model('logs', Schema);

};

