var router = require('express').Router();
var mongoose = require('mongoose');
var Contact = require('./app/models/contact');
var express = require("express");
var app = express();
var Seeder = require('./db/seed');
//dernier argument pour eviter un warning pour les versions >= 4.0 de mongo
var url = process.env.MONGOLAB_URI;
mongoose.connect(url, {useNewUrlParser: true});
Seeder.seed();
//Creation de contact
//Route postman par défaut: 
//localhost:8080/api/create/contact
router.post('/create/contact', function(req, res) {
	var contact = new Contact();		
	contact.name = req.body.name;
	contact.lastName = req.body.lastName;
	contact.mail = req.body.mail;
	contact.tel = req.body.tel;	
	contact.fonction = req.body.fonction;
	contact.validate(function(e) {
		if (e) {
			res.send({status: "error", msg: "erreur de validation", data: e});
		}
		else {
			contact.save(function(e) {
				res.send({status: "success", msg: "Contact créé"});
			});
		}
	});
});

//Liste des contacts et sort
//localhost:8080/api/contacts
router.post('/contacts', function(req, res) {
	var param; //query dynamique (name/lastName)
	if (req.body.param) {
		param = req.body.param;
		if (req.body.order == "desc") {
			param = "-" + param;
		}
	}
	if (req.body.param != "name" && req.body.param != "lastName" && req.body.param != "mail" && req.body.param != "tel" && req.body.param != "fonction") {
		param = 'name'; //valeur par défaut
	}

	Contact.find({}).sort(param).exec(function(e, contacts) {
		if (e) {
			res.send({status: "error", msg: "contact non trouvé", data: e});
		}
		res.send({status: "success", msg: "Liste des contacts", data: contacts});
	});
});

//Recherche d'un contact
router.post('/view', function(req, res) {
	if(req.body.name || req.body.lastName)
	{
		if (req.body.name) {
			Contact.findOne({name: req.body.name}, function(e, contact) {
				if (e) {
					res.send(e);
				}
				if (contact){
					res.json({status: "success", msg: "Infos contact", data: contact});
				}
				else {
					res.json({status: "error", msg: "contact introuvable"});
				}
			});
		}
		if (req.body.lastName) {
			Contact.findOne({lastName: req.body.lastName}, function(e, contact) {
				if (e) {
					res.send(e);
				}
				if (contact){
					res.json({status: "success", msg: "Infos contact", data: contact});
				}
				else {
					res.json({status: "error", msg: "contact introuvable"});
				}
			});
		}
	}
	else {
		res.json({status: "error", msg: "rechercher par name ou lastName"});
	}
});

//Edition de contact
router.post('/edit/:contact_id', function(req, res) {
	Contact.findOneAndUpdate({_id: req.params.contact_id}, {$set:req.body}, function(e, contact) {
		if (e) {
			res.json({status: "error", msg: "contact non trouvé", data: e});
		}
		else {
			res.json({status: "success", msg: "Contact mis à jour", data: contact})
		}
	});
});

router.delete('/delete/:contact_id', function(req, res) {
	Contact.findOne({_id: req.params.contact_id}, function(e, contact) {
		if (e) {
			res.json({status: "error", msg: "contact non trouvé", data: e});
		}
		else {
			contact.remove(function(e) {
				res.json({status: "success", msg: "Contact supprimé"});
			})
		}
	});
});

module.exports = router;
