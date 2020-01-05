const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  cart: { type: Schema.Types.ObjectId, ref: "carts" },
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
