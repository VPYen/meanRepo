var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

mongoose.connect('mongodb://localhost/Cakes', {useNewUrlParser: true });

require('./server/config/routes.js')(app)

app.listen(8000, function() {
  console.log("Listening on port 8000");
});
