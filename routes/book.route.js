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

router.post("/getAuthors", async (req, res) => {
  result = await bookController.getAuthors(req.body);
  res.json({ result });
});

router.post("/getComments", async (req, res) => {
  result = await bookController.getComments(req.body);
  res.json({ result });
});

router.post("/submitComment", async (req, res) => {
  result = await bookController.submitComment(req.body);
  res.json({ result });
});

module.exports = router;
