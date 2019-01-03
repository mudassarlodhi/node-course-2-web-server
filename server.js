

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear' , ()=>{
  return 'test';new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text)=>{
  return text.toUpperCase();
});

app.set("view-engine" ,"hbs");


app.use((req, res, next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} : ${req.url}`;
console.log(log);
fs.appendFile("server.log" , log+ '\n' , (err)=>{
  if(err)
  {
    console.log(err);
  }
});
   next();
});


// app.use((req, res, next)=>{
//   res.render('maintenance.hbs' , {
//     maintenanceTitle: 'Maintenance',
//     maintenancePara: 'The Website Is Under Maintenance. Well Be Back Soon'
//   })
// } )


app.use(express.static(__dirname+'/public'));

app.get('/' , (req , res)=>{
  // res.send('<h1>Hello Express</h1>');

  res.render('home.hbs' , {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome To Our Home Page'
  });

  // res.send({
  //   name: 'Mudasser',
  //   likes : [
  //     'Biking' , 'Cities'
  //   ]
  // });
});

app.get('/about' , (req , res)=>{
 res.render('about.hbs' , {
   pageTitle: 'About Page'
 });
});

app.get('*' , (req , res)=>{
 res.send({
   errorMessage: "The Page Is Not Found"
 });
});


app.listen(port , ()=>{
  console.log(`Server started listening on port ${port}`);
});
