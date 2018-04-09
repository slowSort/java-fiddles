var express = require('express'),
app = express(),
port = process.env.Port || 3000,
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'), //pull in the model
bodyParser = require('body-parser');

mongoose.Promise = global.Promise; //Learn about promises
mongoose.connect('mongodb://localhost/codeMentorDB');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/todoListRoutes'); //pull in route declarations
routes(app);

app.listen(port);

console.log('todo list API server started on port:' + port);
