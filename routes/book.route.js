const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const bookController = require("../controllers/book");

router.post("/getBooks", async (req, res) => {
  let result = await bookController.getBooks(req.body);
  await res.json({ result });
});

router.post("/getBookInfo", async (req, res) => {
  let result = await bookController.getBookInfo(req.body);
  await res.json({ result });
});

router.post("/getAuthors", async (req, res) => {
  let result = await bookController.getAuthors(req.body);
  await res.json({ result });
});

router.post("/getComments", async (req, res) => {
  let result = await bookController.getComments(req.body);
  await res.json({ result });
});

router.post("/submitComment", async (req, res) => {
  let result = await bookController.submitComment(req.body);
  await res.json({ result });
});

module.exports = router;
