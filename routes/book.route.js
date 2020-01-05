var express = require("express");
var router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const bookController = require("../controllers/book");

router.post("/getBookInfo", async (req, res) => {
  result = await bookController.getBookInfo(req.body);
  res.json({ result });
});

module.exports = router;
