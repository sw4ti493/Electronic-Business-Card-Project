var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userdataSchema = new Schema({
    subdomain: String,
    domain: String,
    username: String,
    linkedin: String,
    twitter: String,
    phone: String,
    email: String,
    position: String,
    headline: String,
    skillOneName: String,
    skillOneLink: String,
    skillTwoName: String,
    skillTwoLink: String,
    skillThreeName: String,
    skillThreeLink: String,
    skillFourName: String,
    skillFourLink: String,
    skillFiveName: String,
    skillFiveLink: String,
    skillSixName: String,
    skillSixLink: String

});

module.exports = mongoose.model('UserData', userdataSchema);