const express = require('express');

const app = express();

/*
// How to use middleware 
app.use(function(req, res, next){
  //console.log(Date.now());
  req.name = 'Tomiwa Adedokun';
  next();
});
*/

//Index Route
app.get('/', (req, res) => {
  //console.log(req.name)
  res.send('INDEX');
});

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT APP');
});

const port = 5000;

app.listen(port, () =>{
  console.log('Server started on port ' + port);

});