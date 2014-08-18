var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var Schema = new mongoose.Schema({
        _id         : { type: String, index: true },
        name        : String,
        requirements: [Object]
    });

    return db.model('advancements', Schema);

};

