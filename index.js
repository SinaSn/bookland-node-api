const express = require("express");
const server = require("./configs/server");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Routes
const homeRoutes = require("./routes/home.route");
const authRoutes = require("./routes/auth.route");

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/v1/", homeRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(server.port, function() {
  console.log(`Listening on port ${server.port}`);
  mongoose.connect("mongodb://localhost/bookland", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection Error:"));
  db.once("open", function() {
    console.log("Connection Successful!");
  });
});
