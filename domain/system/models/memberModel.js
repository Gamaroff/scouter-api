var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var Schema = new mongoose.Schema({
        _id         : { type: String, index: true },
        first_name  : { type: String, index: true },
        last_name   : { type: String, index: true },
        active      : { type: Boolean, index: true },
        divisions   : [String],
        member_type : { type: String, index: true },
        advancements: [Object],
        interests   : [Object]
    });

    return db.model('members', Schema);

};

