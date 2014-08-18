var appConfig = require('config').App;

module.exports = function (data) {

    return '<p>Hello</p>' +
        '<p>Your email (' + data.email + ') has requested a Password Reset.</p>' +
        '<p><b>If you do not want to reset your password then ignore this mail.</b></p>' +
        '<p>Please click <a href="' + appConfig.host + '#/reset/' + data.reset_code + '">here</a> to reset your password.</p>' +
        '<p>Regards,</p>' +
        '<p>Scouter</p>';

};