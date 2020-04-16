const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

/*
// How to use middleware 
app.use(function(req, res, next){
  //console.log(Date.now());
  req.name = 'Tomiwa Adedokun';
  next();
});
*/

// Handlebar middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//Index Route
app.get('/', (req, res) => {
  //console.log(req.name)
  const title = 'Welcome Back';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

const port = 5000;

app.listen(port, () =>{
  console.log('Server started on port ' + port);

});