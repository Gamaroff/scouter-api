var mongoose = require('mongoose');

module.exports = function (db) {
    'use strict';

    var self = this;

    var Schema = new mongoose.Schema({
        _id            : { type: String, index: true },
        first_name     : String,
        last_name      : String,
        is_super_admin : Boolean,
        is_admin       : Boolean,
        is_customer    : Boolean,
        org_id         : { type: String, index: true },
        sites          : [String],
        units          : [String],
        points_of_sales: [String],
        status         : Boolean,
        active         : { type: Boolean, index: true },
        activated      : { type: Boolean, index: true },
        salt           : String,
        activation_code: String,
        hash           : String,
        reset_code     : String
    });

    return db.model('users', Schema);

};

