const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = require("../models/cart.model");

const paymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  cart: { type: Cart.schema },
  discount: { type: Schema.Types.ObjectId, ref: "discounts" },
  price: Number,
  succeeded: Boolean,
  trackingCode: String,
  refNumber: String,
  dateCreated: Date,
  reservedUntil: Date
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
