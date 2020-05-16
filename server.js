// Dependencies
var path = require('path');
var express = require('express');
var app = express();

// PORT setup for the application
var PORT = process.env.PORT || 3000;

// Static content for the app from the "public" directory in the app directory.
app.use(express.static("public")); 
// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Set up handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import route and give the server acces to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});