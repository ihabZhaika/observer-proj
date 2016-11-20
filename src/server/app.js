var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/observer');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var commodity = require('./models/commodity.model');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // create
  app.post('/commodity', function(req, res) {
    console.log(req.params);
    var obj = new commodity(req.body);
    console.log(obj);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  app.get('/commodity', function(req, res)
  {
    console.log(req.query.name);
  });
    // APIs
  // // select all
  // app.get('/cats', function(req, res) {
  //   Cat.find({}, function(err, docs) {
  //     if(err) return console.error(err);
  //     res.json(docs);
  //   });
  // });
  //
  // // count all
  // app.get('/cats/count', function(req, res) {
  //   Cat.count(function(err, count) {
  //     if(err) return console.error(err);
  //     res.json(count);
  //   });
  // });
  //
  // // create
  // app.post('/cat', function(req, res) {
  //   var obj = new Cat(req.body);
  //   obj.save(function(err, obj) {
  //     if(err) return console.error(err);
  //     res.status(200).json(obj);
  //   });
  // });
  //
  // // find by id
  // app.get('/cat/:id', function(req, res) {
  //   Cat.findOne({_id: req.params.id}, function(err, obj) {
  //     if(err) return console.error(err);
  //     res.json(obj);
  //   })
  // });
  //
  // // update by id
  // app.put('/cat/:id', function(req, res) {
  //   Cat.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
  //     if(err) return console.error(err);
  //     res.sendStatus(200);
  //   })
  // });
  //
  // // delete by id
  // app.delete('/cat/:id', function(req, res) {
  //   Cat.findOneAndRemove({_id: req.params.id}, function(err) {
  //     if(err) return console.error(err);
  //     res.sendStatus(200);
  //   });
  // });


  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});

module.exports = app;
