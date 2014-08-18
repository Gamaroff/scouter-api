var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var Schema = new mongoose.Schema({
        _id            : { type: String, index: true },
        first_name     : String,
        last_name      : String,
        active         : { type: Boolean, index: true },
        activated      : { type: Boolean, index: true },
        salt           : String,
        activation_code: String,
        hash           : String,
        reset_code     : String,
        groups         : [String]
    });

    return db.model('users', Schema);

};

