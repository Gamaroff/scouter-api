var appConfig = require('config').App;
var request = require('request')
var should = require('should')
var userRepo = require('../../domain/system/repository/userRepository');

describe('User Tests', function () {

    describe('/api/user', function () {
        it('save a user', function (done) {

            var user = {
                email   : 'test@scouter.com',
                no_email: true
            };

            request.post(appConfig.api_host + '/api/user', {form: user}, function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Object).and.have.property('_id');
                        result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                        result.should.be.an.instanceOf(Object).and.have.property('activated');
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('userApi.getUser', function () {
        it('get a user from the repo', function (done) {

            userRepo.getUser({_id: 'test@scouter.com'}, function (err, result) {

                if (err) {
                    done(err);
                    return;
                }

                if (result) {
                    result.should.be.an.instanceOf(Object).and.have.property('_id');
                    done()
                } else {
                    done('User not found');
                }

            });

        });
    });

    describe('/api/user/activate', function () {
        it('activate a user', function (done) {

            userRepo.getUser({_id: 'test@scouter.com'}, function (err, result) {

                var user = result;

                user.email = user._id;
                user.password = '12345';

                request.post(appConfig.api_host + '/api/user/activate', {form: user}, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        var data = JSON.parse(body);

                        data.should.be.an.instanceOf(Object).and.have.property('result');

                        if (data.result) {
                            var result = data.result;
                            result.active.should.be.true;
                            result.should.be.an.instanceOf(Object).and.have.property('_id');
                            result.should.be.an.instanceOf(Object).and.have.property('salt');
                            result.should.be.an.instanceOf(Object).and.have.property('hash');
                            result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                            result.should.be.an.instanceOf(Object).and.have.property('activated');
                        }

                        done();
                    } else {
                        throw 'Failed';
                    }
                });
            });

        });
    });

    describe('/api/user/login', function () {
        it('log in a user', function (done) {

            var user = {
                email   : 'test@scouter.com',
                password: '12345'
            };

            request.post(appConfig.api_host + '/api/user/login', {form: user}, function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Object).and.have.property('_id');
                        result.should.be.an.instanceOf(Object).and.have.property('salt');
                        result.should.be.an.instanceOf(Object).and.have.property('hash');
                        result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                        result.should.be.an.instanceOf(Object).and.have.property('activated');
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('/api/user/activated', function () {
        it('check if user is activated', function (done) {

            userRepo.getUser({_id: 'test@scouter.com'}, function (err, result) {

                var user = result;

                request.post(appConfig.api_host + '/api/user/activated', {form: user}, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        var data = JSON.parse(body);

                        data.should.be.an.instanceOf(Object).and.have.property('result');

                        if (data.result) {
                            var result = data.result;
                            result.active.should.be.true;
                            result.should.be.an.instanceOf(Object).and.have.property('_id');
                            result.should.be.an.instanceOf(Object).and.have.property('salt');
                            result.should.be.an.instanceOf(Object).and.have.property('hash');
                            result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                            result.should.be.an.instanceOf(Object).and.have.property('activated');
                        }

                        done();
                    } else {
                        throw 'Failed';
                    }
                });
            });

        });
    });

    describe('/api/user/request_reset', function () {
        it('request a password reset', function (done) {

            var user = {
                email   : 'test@scouter.com',
                no_email: true
            };

            request.post(appConfig.api_host + '/api/user/request_reset', {form: user}, function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Object).and.have.property('_id');
                        result.should.be.an.instanceOf(Object).and.have.property('salt');
                        result.should.be.an.instanceOf(Object).and.have.property('hash');
                        result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                        result.should.be.an.instanceOf(Object).and.have.property('activated');
                        result.should.be.an.instanceOf(Object).and.have.property('reset_code');
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

    describe('/api/user/reset', function () {
        it('reset password', function (done) {

            userRepo.getUser({_id: 'test@scouter.com'}, function (err, result) {

                var user = result;

                user.email = user._id;
                user.password = '12345';

                request.post(appConfig.api_host + '/api/user/reset', {form: user}, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        var data = JSON.parse(body);

                        data.should.be.an.instanceOf(Object).and.have.property('result');

                        if (data.result) {
                            var result = data.result;
                            result.should.be.an.instanceOf(Object).and.have.property('_id');
                            result.should.be.an.instanceOf(Object).and.have.property('salt');
                            result.should.be.an.instanceOf(Object).and.have.property('hash');
                            result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                            result.should.be.an.instanceOf(Object).and.have.property('activated');
                            result.should.be.an.instanceOf(Object).and.have.property('reset_code');
                        }

                        done();
                    } else {
                        throw 'Failed';
                    }
                });
            });

        });
    });

    describe('/api/user/reset_code', function () {
        it('can the user reset their password', function (done) {

            userRepo.getUser({_id: 'test@scouter.com'}, function (err, result) {

                var user = result;

                request(appConfig.api_host + '/api/user/reset/6b165ffd-1a2f-497b-adbd-10632d789350', function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        var data = JSON.parse(body);

                        data.should.be.an.instanceOf(Object).and.have.property('result');

                        if (data.result) {
                            var result = data.result;
                            result.should.be.an.instanceOf(Object).and.have.property('_id');
                            result.should.be.an.instanceOf(Object).and.have.property('salt');
                            result.should.be.an.instanceOf(Object).and.have.property('hash');
                            result.should.be.an.instanceOf(Object).and.have.property('activation_code');
                            result.should.be.an.instanceOf(Object).and.have.property('activated');
                            result.should.be.an.instanceOf(Object).and.have.property('reset_code');
                        }

                        // Now that user tests are complete delete the test user
                        userRepo.delete('test@scouter.com', function (err, result) {

                        });

                        done();
                    } else {
                        throw 'Failed';
                    }
                });

            });
        });
    });

    describe('/api/users', function () {
        it('get all users', function (done) {

            request(appConfig.api_host + '/api/users', function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var data = JSON.parse(body);

                    data.should.be.an.instanceOf(Object).and.have.property('result');

                    if (data.result) {
                        var result = data.result;
                        result.should.be.an.instanceOf(Array);
                    }

                    done();
                } else {
                    throw 'Failed';
                }
            });

        });
    });

});