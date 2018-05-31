const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


app.set('View Engine', 'hbs');

//registr midddleware to tell exprees done any work we want
//we have use to tell program to go next other wise it will not exe another lines of program

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
  
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
      if(err){
       console.log('error')
      }});
    next();
  });
  
//   app.use((req, res, next ) => {
//       res.render('maintenance.hbs')
//   });


// Partials are reusble componets that are used in handlebars
hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});



hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase();
});




//use for using staic pages which return simple html page 
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {

     res.render('home.hbs', {
         welcomeMessage: 'Welcome to Home Page',
         pageTitle: 'Home Page'
     })
});

// app.get('/', (req, res) => {
//  // res.send('<H1>Hello World</H1>');
//   res.send({
//       name: 'Vivek Kadu',
//       skills: [
//        'Web Development',
//        'React Native'
//       ]
//   })
// });

app.get('/about', (req, res) => {
   res.render('about.hbs',{
       pageTitle: 'AboutPage',
   })
});


app.get('/justPage', (req, res) => {
    res.render('justPage.hbs',{
        pageTitle: 'JustPage',
    })
 });
 


app.get('/bad', (req, res) => {
  res.send({
      error: "Unable to connect"
    });
});


app.listen(port, () => {
    console.log(`Sever is On port No ${port}`)
});

