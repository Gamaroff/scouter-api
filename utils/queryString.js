function QueryModule() {
    'use strict';

    var self = this;

    self.parse = function (querystring) {

        if (typeof querystring !== 'string')
            return {err : 'Incorrectly formatted query'};
        else {
            var str = querystring.split('&');
            var query = {};

            str.forEach(function (item) {
                var p = item.split('=');
                query[p[0]] = p[1];
            });

            return {query : query};
        }

    };

}

module.exports = new QueryModule();