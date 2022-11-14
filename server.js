
// Modifications:
//
const express = require("express");

// make an instance of the express object
const app = express();
const PORT = 3000;

// serve static web pages from the public directory
app.use(express.static('public'));

// serve some routes
// The hello api returns a complete page of HTML, which is not
// what AJAX was designed to handle.  There is, unfortunately,
// no easy way to get browser to create a new DOM for a complete
// page of html that is returned from an AJAX call.  See the hello2
// route for an example of how AJAX was intended to be used.
app.get("/hello", (req,res)=> {
  const name = req.query.name;
  let page ="<html><head><title>HelloApp</title></head><body>";
      page += `<h1>Hello, ${name}</h1></body></html>`;
  res.send(page);
});

// Second get example - to be used with AJAX
// AJAX is intended to be used to retrieve data or parts of
// pages, as opposed to retrieving a full pages.  Hence, this
// route returns just the h1 element of the greeting, which 
// can be inserted into an existing page.  
// app.get("/hello2", (req,res)=> {
//   const name = req.query.name;
//   let greeting = '<h1 style="background-color:blue;color:white">';
//   greeting += `Hello, ${name}</h1>`;
//   res.send(greeting);
// });

// configures the app to handle a POST data in json
app.use(express.json());

// simple post route to return a greeting in json
/* app.post('/sayHello',(req,res) => {
  let name = req.body.name;
  console.log(`Received greeting request for ${name}`);
  let greeting = {
    personName: name
  }
  res.json(greeting);
}); */

// Listen on PORT for http requests
app.listen(PORT, (err) => {
    if (err) 
      console.log("Server failed to start");
    else 
      console.log(`Server started on port ${PORT}.`)
})