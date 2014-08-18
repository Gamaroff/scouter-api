var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var Schema = new mongoose.Schema({
        _id         : { type: String, index: true },
        date_stamp  : Number,
        members     : [Object],
        advancements: [Object],
        interests   : [Object]
    });

    return db.model('programs', Schema);

};

