// Dependencies
const path = require('path');
const express = require('express');
const app = express();

// PORT setup for the application
const PORT = process.env.PORT || 3000;

// Content for the app from the "public" directory in the app directory.
app.use(express.static("public")); 

// Set up Express app to handle incoming data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import route and give the server access to them.
const routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start our server to begin listening to requests.
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});