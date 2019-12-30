var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

// Controllers
const authController = require("../controllers/auth");

router.post("/token", (req, res) => {
  result = authController.token(req, res);
  res.json({ result });
});

module.exports = router;
