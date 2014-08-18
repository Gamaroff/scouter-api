var appConfig = require('config').App;
var request = require('request');
var should = require('should');
var organisationRepo = require('../../domain/system/repository/organisationRepository');

describe('Organisation Tests', function () {

    describe('/api/organisations', function () {
        it('get all organisations', function (done) {

            request(appConfig.api_host + '/api/organisations', function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Array);

                        if (result.length > 0) {
                            var org = result[0];
                            org.should.be.an.instanceOf(Object).and.have.property('name');
                        }
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('/api/organisation', function () {
        it('save an organisation', function (done) {

            var user = {
                _id           : 'testorg',
                support_number: '1234567890',
                support_email : 'test@org',
                currency      : 'ZAR',
                sms_alerts    : false,
                contact_number: '12345667',
                status        : true
            };

            request.post(appConfig.api_host + '/api/organisation', {form: user}, function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Object).and.have.property('_id');
                    }

                    organisationRepo.delete('testorg', function (err, result) {

                    });

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('/api/organisation/sites', function () {
        it('get all organisation sites', function (done) {

            request(appConfig.api_host + '/api/scouter/sites', function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Array);

                        if (result.length > 0) {
                            var org = result[0];
                            org.should.be.an.instanceOf(Object).and.have.property('site_name');
                        }
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('/api/organisation/:org_id', function () {
        it('get organisation', function (done) {

            request(appConfig.api_host + '/api/organisation/scouter', function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Object).and.have.property('name');
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('/api/organisation/users', function () {
        it('get all organisation users', function (done) {

            request(appConfig.api_host + '/api/scouter/users', function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Array);

                        if (result.length > 0) {
                            var org = result[0];
                            org.should.be.an.instanceOf(Object).and.have.property('_id');
                        }
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

});