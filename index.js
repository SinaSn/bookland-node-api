const express = require("express");
const cors = require("cors");
const server = require("./configs/server");
const fs = require("fs");
const jwt = require("jsonwebtoken");

var app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

// let's first add a /secret api endpoint that we will be protecting
app.get("/secret", isAuthenticated, (req, res) => {
  res.json({ message: "THIS IS SUPER SECRET, DO NOT SHARE!" });
});

// and a /readme endpoint which will be open for the world to see
app.get("/readme", (req, res) => {
  res.json({ message: "This is open to the world!" });
});

app.get("/jwt", (req, res) => {
  let privateKey = fs.readFileSync("./data/private.pem", "utf8");
  let token = jwt.sign({ body: "stuff" }, "MySuperSecretPassPhrase", {
    algorithm: "HS256"
  });
  res.send(token);
});

function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    // retrieve the authorization header and parse out the
    // JWT using the split function
    let token = req.headers.authorization.split(" ")[1];
    let privateKey = fs.readFileSync("./private.pem", "utf8");
    // Here we validate that the JSON Web Token is valid and has been
    // created using the same private pass phrase
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      // if there has been an error...
      if (err) {
        // shut them out!
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
      }
      // if the JWT is valid, allow them to hit
      // the intended endpoint
      return next();
    });
  } else {
    // No authorization header exists on the incoming
    // request, return not authorized and throw a new error
    res.status(500).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
  }
}

app.listen(server.port, function() {
  console.log(`Listening on port ${server.port}`);
});
