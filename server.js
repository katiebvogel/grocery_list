var express = require('express');
var mongoose = require('mongoose');
var itemsRouter = require('./routes/items');
var index = require('./routes/index');
var bodyParser = require('body-parser');


var app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
app.use('/items', itemsRouter);

var mongoURI = "mongodb://localhost:27017/groceries";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
  console.log('mongodb connection is open!');
});


var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port );
})
