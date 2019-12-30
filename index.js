const express = require("express");
const server = require("./configs/server");
const bodyParser = require("body-parser");

// Routes
const homeRoutes = require("./routes/home.route");
const authRoutes = require("./routes/auth.route");

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", homeRoutes);
app.use("/auth", authRoutes);

app.listen(server.port, function() {
  console.log(`Listening on port ${server.port}`);
});
