const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const authController = require("../controllers/auth");

router.post("/register", async (req, res) => {
  result = await authController.register(req.body);
  res.json({ result });
});

router.post("/login", async (req, res) => {
  result = await authController.login(req.body);
  res.json({ result });
});

router.post("/verify", authMiddleware.isAuthenticated, async (req, res) => {
  result = await authController.verify(req);
  res.json({ result });
});

module.exports = router;
