const express = require("express");
const configs = require("./configs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Routes
const startupRoutes = require("./routes/startup.route");
const authRoutes = require("./routes/auth.route");
const bookRoutes = require("./routes/book.route");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/startup", startupRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);

app.listen(configs.port, function() {
  console.log(`Listening on port ${configs.port}`);
  mongoose.connect(configs.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection Error:"));
  db.once("open", async function() {
    console.log("Connection Successful!");
  });
});
