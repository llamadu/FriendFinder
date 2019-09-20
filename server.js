// Import Express
var express = require("express");
// Create an Instance of express
var app = express();
// set port http://localhost:8080)
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Links to Routes
require("./routing/apiRoutes.js")(app)
require("./routing/htmlRoutes.js")(app)

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

