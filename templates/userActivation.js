var appConfig = require('config').App;

module.exports = function (data) {

    return '<p>Hello</p>' +
        '<p>Your email (' + data.email + ') has been registered on the Scouter System.</p>' +
        '<p><em><strong>To log into the dashboard you may use http://dashboard.scouter.com</strong></em></p>' +
        '<p>If you did not register or have received this email in error then you do not have to do anything.</p>' +
        '<p>Copy this link into your browser to activate your account: <br><br>' + appConfig.host + '#/activate/' + data.activation_code + '</p>' +
        '<p><strong>Ensure that you are using either Firefox or Chrome to view the site.</strong></p>' +
        '<p>Regards,</p>' +
        '<p>Scouter</p>';

};