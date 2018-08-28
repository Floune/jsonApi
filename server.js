var express = require('express');
var app = express();
var routes = require('./routes');

var port = process.env.PORT || 8080;

app.use('/api', routes);

app.listen(port);
console.log('serveur démarré sur le port ' + port);
