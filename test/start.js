var web = require('../web');

describe('Scouter Tests', function () {
    before(function (done) {

        web.setup(function (err, result) {
            if (result) {
                done();
            }
        });

    });

    require('./routes/main');

});