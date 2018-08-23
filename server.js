const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
   res.render('maintenance.hbs');
});

app.use((req,res,next) => {
var now = new Date().toString();
fs.appendFile('server.log',`${now}.${req.method}.${req.url} +'\n'`,(error)=>{
if(error) {
	console.log('an error occurred!');
}
});
console.log(now);
next();
});



app.use(express.static(__dirname + '/public'));


hbs.registerHelper('currentYear',() => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/',(req, res) => { 
	res.render('home.hbs',{
  	pageTitle: 'NODEJS',
  	welcome : 'welcome to NodeJs'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
  	pageTitle: 'About Page' 
  });
});

app.get('/bad',(req,res) => {
  res.send({
  	Error : 'This is an Error'
  });
});

app.listen(3000);