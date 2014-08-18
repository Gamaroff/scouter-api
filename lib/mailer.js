var nodemailer = require("nodemailer");
var emailConfig = require('config').Email;
var clickatellConfig = require('config').Clickatell;
var _ = require('underscore');
var moment = require('moment');

function Mailer() {

    var self = this;

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service : "Gmail",
        auth    : {
            user : emailConfig.user,
            pass : emailConfig.pass
        }
    });

    self.sendMail = function (recipients, subject, body, attachments, callback) {

        var mailOptions = {
            from        : "Scouter " + emailConfig.from, // sender address
            subject     : subject,
            to          : recipients,
            html        : body,
            attachments : attachments
        };

        smtpTransport.sendMail(mailOptions, callback);

    };

    self.sendSms = function (customers, message) {

        var textBody = 'api_id:' + clickatellConfig.smtp_api_id + ' \n' +
            'user:scouter \n' +
            'password:' + clickatellConfig.password + ' \n';

        _.each(customers, function (customer) {
            textBody += 'to:' + customer.cell_no + ' \n';
        });

        textBody += 'text:' + message;

        var mailOptions = {
            from : "Scouter " + emailConfig.from, // sender address
            to   : clickatellConfig.sendToAddress,
            text : textBody
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                //  console.log(error);
            } else {
                //  console.log("Message sent: " + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });

    };

}

module.exports = new Mailer();