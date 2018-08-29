let mongoose = require('mongoose');
let Contact = require('../app/models/contact');
const data = 	[
{
	name: "Jane",
	lastName: "Doe",
	mail: "janedoe@gmail.com",
	tel: "0556875478",
	fonction: "CEO"
},
{
	name: "John",
	lastName: "Doe",
	mail: "johndoe@gmail.com",
	tel: "0556875478",
	fonction: "secretary"
},
{
	name: "Bryan",
	lastName: "Smith",
	mail: "bsmith@gmail.com",
	tel: "0555885478",
	fonction: "employee"
},
{
	name: "Andrew",
	lastName: "Hutchinson",
	mail: "ahuth@gmail.com",
	tel: "0556875447",
	fonction: "employee"
},
]


var Seeder = {
	seed: function() {
		mongoose.connection.collections['contacts'].drop( function(err) {
			console.log('collection dropped');
		});
		for (let i = 0; i < data.length; i++) {
			this.createContact(data[i]);
		}
	},

	createContact: function(data) {
		var contact = new Contact();		
		contact.name = data.name;
		contact.lastName = data.lastName;
		contact.mail = data.mail;
		contact.tel = data.tel;
		contact.fonction = data.fonction;
		contact.save();
	}
}
module.exports = Seeder;