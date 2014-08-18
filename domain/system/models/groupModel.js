var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var DivisionSchema = new mongoose.Schema({
        _id : { type: String, index: true },
        name: String
    });

    var Schema = new mongoose.Schema({
        _id      : { type: String, index: true },
        name     : String,
        divisions: [DivisionSchema]
    });

    return db.model('groups', Schema);

};

