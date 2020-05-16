// Dependencies
const path = require('path');
const express = require('express');
const app = express();
const mysql = require("mysql");

require('dotenv').config();

const connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "burgers_db"
  });
};

// Makimg connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  // PORT setup for the application
  const PORT = process.env.PORT || 3000;
  


const router = express.Router();

// Create all our routes and set up logic within those routes where needed.
router.get("/", function(req, res) {
  burger.all(function(data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so err
      return res.status(err).end();
    } else {
      res.status(200).end();
    }
  });
});


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