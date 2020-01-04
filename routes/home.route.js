var express = require("express");
var router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const bookController = require("../controllers/book");

router.get("/", (req, res, err) => {
  res.send("Hello Home!");
});

router.post("/getBooks", async (req, res) => {
  result = await bookController.getBooks(req.body);
  res.json({ result });
});

// let's first add a /secret api endpoint that we will be protecting
router.get("/secret", authMiddleware.isAuthenticated, (req, res) => {
  res.json({ message: "THIS IS SUPER SECRET, DO NOT SHARE!" });
});

module.exports = router;
