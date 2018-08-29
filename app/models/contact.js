var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	mail:  {
		type: String,
		required: true,
		dropDups: true,
	},
	tel: Number,
	fonction: String
});

var Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;