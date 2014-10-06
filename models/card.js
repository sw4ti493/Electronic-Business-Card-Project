var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
	subdomain: String,
	domain: String,
	firstName: String,
	lastName: String,
	headline: String,
	email: String,
	skillTitle: String,
	skillLink: String,
	skillOrder: String,
	phoneNumber: String,
	linkedin: String,
	twitter: String

});

module.exports = mongoose.model('Card', cardSchema);