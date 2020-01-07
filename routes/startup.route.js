const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const startupController = require("../controllers/startup");

router.post("/getUserInfo", authMiddleware.isAuthenticated, async (req, res) => {
  let result = await startupController.getUserInfo(req.email);
  await res.json({ result });
});

router.post("/getBasicInfo", async (req, res) => {
  let result = await startupController.getBasicInfo();
  await res.json({ result });
});

module.exports = router;
