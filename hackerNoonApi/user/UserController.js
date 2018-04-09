var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

//GET A SINGLE USER FROM THE DATABASE
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user){
    if(err) return res.status(500).send("Error finding user");
    if(!user) return res.status(404).send("User not found.");
    res.status(200).send(user);
  });
});

//GET ALL VALUES FROM THE DATABASE
router.get('/', function(req, res){
  User.find({}, function(err, users) {
    if(err) return res.status(500).send("There was a problem finding the users");
    res.status(200).send(users);
  });
});

//DELETE A USER FROM THE DATABASE
router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    if(err) return res.status(500).send("Error deleting user");
    res.status(200).send("User "+ user.name +" was deleted.");
  });
});

//CREATE A NEW USER
router.post('/', function(req, res){
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  },
  function(err,user) {
    if(err) return res.status(500).send("There was a problem adding the info to the database.");
    res.status(200).send(user);
  });
});

//UPDATES A USER IN THE database
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true},
    function (err, user) {
      if(err) return res.status(500).send("There was a problem updating a database user.");
      res.status(200).send(user);
  });
});

module.exports = router;
