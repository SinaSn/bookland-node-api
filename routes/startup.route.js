const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const startupController = require("../controllers/startup");

router.post("/getUserInfo", async (req, res) => {
  result = await startupController.getUserInfo();
  res.json({ result });
});

router.post("/getBasicInfo", async (req, res) => {
  result = await startupController.getBasicInfo();
  res.json({ result });
});

module.exports = router;
