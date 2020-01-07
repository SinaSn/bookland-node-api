const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const authController = require("../controllers/auth");

router.post("/register", async (req, res) => {
  let result = await authController.register(req.body);
  await res.json({ result });
});

router.post("/login", async (req, res) => {
  let result = await authController.login(req.body);
  await res.json({ result });
});

router.post("/verify", authMiddleware.isAuthenticated, async (req, res) => {
  let result = await authController.verify(req);
  await res.json({ result });
});

module.exports = router;
