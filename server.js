var express = require('express');
var app = express();
var routes = require('./routes');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.listen(port);
console.log('serveur démarré sur le port ' + port);

//routes
app.use('/api', routes);
