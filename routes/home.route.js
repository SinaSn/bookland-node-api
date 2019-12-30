var express = require("express");
var router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");

router.get("/", (req, res, err) => {
  res.send("Hello Home!");
});

router.get("/readme", (req, res) => {
  res.json({ message: "This is open to the world!" });
});

// let's first add a /secret api endpoint that we will be protecting
router.get("/secret", authMiddleware.isAuthenticated, (req, res) => {
  res.json({ message: "THIS IS SUPER SECRET, DO NOT SHARE!" });
});

module.exports = router;
