const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

/*
// How to use middleware 
app.use(function(req, res, next){
  //console.log(Date.now());
  req.name = 'Tomiwa Adedokun';
  next();
});
*/
// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to Mongoose
mongoose.connect('mongodb://localhost/tasky-dev', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Load Idea Models
require('./models/ideas');
const Idea = mongoose.model('ideas');

// Handlebar middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Index Route
app.get('/', (req, res) => {
  //console.log(req.name)
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        res.redirect('/ideas');
      })
  }
});

const port = 5000;

app.listen(port, () =>{
  console.log('Server started on port ' + port);

});