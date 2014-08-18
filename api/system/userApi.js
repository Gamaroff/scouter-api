var bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var appConfig = require('config').App;
var repository = require('../../lib/mongoRepository');
var scouterDb = require('../../domain/system');
var mailer = require('../../lib/mailer');
var registerTemplate = require('../../templates/userActivation');
var resetTemplate = require('../../templates/passwordReset');

function UserApi() {
    'use strict';

    var self = this;

    // server.post('/api/users', userApi.saveUser);
    self.saveUser = function (data, callback) {

        if (!data.email) {
            callback('Invalid data');
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.save(data, callback);

    };

    // server.get('/api/users', userApi.getUsers);
    self.getUsers = function (callback) {
        var userRepo = new repository(scouterDb.models.user);
        userRepo.get(callback);
    };

    // server.get('/api/users/:user_id', userApi.getUser);
    self.getUser = function (data, callback) {
        var query = {
            query: {
                _id: data.user_id
            }
        };

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get(query, function (err, result) {
            if (result && result.length > 0) {
                callback(null, result[0]);
            } else {
                callback('No item found');
            }
        });

    };

    // server.get('/api/users/organisation/:org_id', userApi.getOrganisationUsers);
    self.getOrganisationUsers = function (data, callback) {
        var query = {
            query: {
                org_id: data.org_id
            }
        };

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get(query, callback);
    };

    // server.post('/api/users/login', userApi.login);
    self.login = function (data, callback) {

        var email = data.email;
        var password = data.password;

        if (!email || !password) {
            callback('Invalid Data - Must specify Email, Password');
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get({query: {_id: email}}, function (err, result) {

            if (result && result.length > 0) {
                var user = result[0];

                user.token = jwt.sign(user, appConfig.secure_token, { expiresInMinutes: 60 * 8 });

                if (!user.activated) {
                    callback('That user is not yet activated.');
                    return;
                }

                if (!user.active) {
                    res.json({err: 'That login has been disabled. Please contact your administrator'});
                    return;
                }

                bcrypt.hash(password, user.salt, function (err, hash) {

                    if (hash === user.hash) {

                        user.session_id = uuid.v4();
                        user.session_start = moment().unix();

                        if (user.org_id) {
                            var organisationRepo = new repository(scouterDb.models.organisation);
                            organisationRepo.get({query: {_id: user.org_id}}, function (err, result) {
                                if (result && result.length > 0) {
                                    user.organisation = result[0];
                                }

                                if (user.customer_id) {
                                    getCustomerMeters(user, callback);
                                } else {
                                    callback(null, user);
                                }

                            });

                        } else {
                            if (user.customer_id) {
                                getCustomerMeters(user, callback);
                            } else {
                                callback(null, user);
                            }
                        }

                    }
                    else {
                        callback('Invalid password');
                    }

                });

            } else {
                callback('User not found');
            }

        });

        var getCustomerMeters = function (user, callback) {
            customerRepo.getMeters({org_id: user.org_id, customer_id: user.customer_id}, function (err, result) {

                if (!err) {
                    if (result && result.length > 0) {
                        user.meters = result;
                    }
                }

                callback(null, user);

            });
        }

    };

    // server.post('/api/users/activate', userApi.activate);
    self.activate = function (data, callback) {

        var email = data.email;
        var password = data.password;
        var activationCode = data.activation_code;

        if (!email || !password || !activationCode) {
            callback('Invalid Data');
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get({query: {_id: email, activation_code: activationCode}}, function (err, result) {

            if (!result) {
                callback('Invalid user details. Ensure your activation code is correct.');
            } else {

                if (result.length <= 0) {
                    callback('Invalid user details. Ensure your activation code is correct.');
                    return;
                }

                bcrypt.genSalt(10, function (err, salt) {

                    var dto = {
                        salt     : salt,
                        activated: true,
                        active   : true,
                        status   : true
                    };

                    bcrypt.hash(password, salt, function (err, hash) {
                        dto.hash = hash;
                        userRepo.update({query: {_id: email}, update: dto}, callback);
                    });
                });

            }

        });

    };

    // server.post('/api/users/activated', userApi.activated);
    self.activated = function (data, callback) {

        var activationCode = data.activation_code;

        if (!activationCode) {
            callback('Invalid Data');
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get({query: {activation_code: activationCode}}, function (err, result) {

            if (result && result.length > 0) {
                callback(null, result[0]);
                return;
            }

            callback('Invalid user details. Ensure your activation code is correct.');
        });

    };

    // server.post('/api/users/request_reset', userApi.requestReset);
    self.requestReset = function (data, callback) {

        var email = data.email;
        var noEmail = data.no_email;

        if (!email) {
            res.json({err: 'Invalid Data'});
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.update({query: {_id: email}, update: {reset_code: uuid.v4()}}, function (err, result) {

            if (!err) {

                if (!noEmail) {
                    var body = resetTemplate({email: email, reset_code: result.reset_code});
                    mailer.sendMail(result._id, 'Scouter - Password Reset', body, null, function (err, result) {

                    });
                }

                callback(null, result);
            } else {
                callback('No user found.');
            }
        });

    };

    // server.post('/api/users/reset', userApi.reset);
    self.reset = function (data, callback) {

        var email = data.email;
        var password = data.password;
        var resetCode = data.reset_code;

        if (!email || !password || !resetCode) {
            res.json({err: 'Invalid Data'});
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get({query: {_id: email, reset_code: resetCode}}, function (err, result) {

            if (!result || result.length <= 0) {
                callback('Invalid user details. Ensure your Reset Code is correct.');
            } else {

                bcrypt.genSalt(10, function (err, salt) {

                    data.salt = salt;

                    bcrypt.hash(password, salt, function (err, hash) {

                        var dto = {
                            hash      : hash,
                            reset_code: '',
                            status    : true
                        };

                        var user = new model(scouterDb.models.user);
                        user.update({query: {_id: id}, update: dto}, function (err, result) {
                            callback(err, result);
                        });

                    });
                });

            }

        });

    };

    // server.get('/api/users/reset/:reset_code', userApi.canReset);
    self.canReset = function (data, callback) {

        var code = data.reset_code;

        if (!code) {
            res.json({err: 'Invalid Data'});
            return;
        }

        var userRepo = new repository(scouterDb.models.user);
        userRepo.get({query: {reset_code: code}}, function (err, result) {
            if (result && result.length > 0) {
                res.json({result: result[0]});
            } else {
                res.json({err: 'No items found'});
            }
        });

    };

}

module.exports = new UserApi();