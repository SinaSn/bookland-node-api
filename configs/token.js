const fs = require("fs");
const jwt = require("jsonwebtoken");

var privateKEY = fs.readFileSync("./private.key", "utf8");
var publicKEY = fs.readFileSync("./public.key", "utf8");

/*
 ====================   JWT Signing =====================
*/
function generate(email, password) {
  var payload = {
    email: email,
    password: password
  };

  var signOptions = {
    issuer: "bookland",
    subject: "bookland",
    audience: "bookland",
    expiresIn: "12h",
    algorithm: "RS256" // RSASSA [ "RS256", "RS384", "RS512" ]
  };
  var token = jwt.sign(payload, privateKEY, signOptions);
  return token;
}

/*
 ====================   JWT Verify =====================
*/
function verify(token) {
  var verifyOptions = {
    issuer: "bookland",
    subject: "bookland",
    audience: "bookland",
    expiresIn: "12h",
    algorithm: ["RS256"]
  };
  var legit = jwt.verify(token, publicKEY, verifyOptions);
  return JSON.stringify(legit);
}
