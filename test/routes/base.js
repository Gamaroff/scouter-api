var appConfig = require('config').App;
var request = require('request')
var should = require('should')

describe('/', function () {
    it('should return basic meter information from redis', function (done) {

        request(appConfig.api_host + '/', function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var data = JSON.parse(body);

                data.should.be.an.instanceOf(Object).and.have.property('result');

                if (data.result) {
                    var result = data.result;
                    result.should.be.an.instanceOf(Object).and.have.property('meter_number');
                }

                done();
            } else {
                throw 'Failed';
            }
        });

    });
});
