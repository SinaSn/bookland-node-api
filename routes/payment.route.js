const express = require("express");
const router = express.Router();

// Middlewares
const authMiddleware = require("../middlewares/auth");
// Controllers
const paymentController = require("../controllers/payment");

router.post("/payment", async (req, res) => {
  let result = await paymentController.payment(req.body, req.email);
  await res.json({ result });
});

router.get("/verify", async (req, res) => {
  let result = await paymentController.verify({
    authority: req.query.Authority,
    status: req.query.Status
  });
  await res.json({ result });
});

module.exports = router;
