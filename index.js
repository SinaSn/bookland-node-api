var express = require("express");
var cors = require("cors");
var server = require("./configs/server");

var app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

// let's first add a /secret api endpoint that we will be protecting
app.get("/secret", (req, res) => {
  res.json({ message: "THIS IS SUPER SECRET, DO NOT SHARE!" });
});

// and a /readme endpoint which will be open for the world to see
app.get("/readme", (req, res) => {
  res.json({ message: "This is open to the world!" });
});

app.listen(server.port, function() {
  console.log(`Listening on port ${server.port}`);
});
