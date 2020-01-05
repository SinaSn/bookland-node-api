const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = require("./book.model").schema;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  books: [Book],
  price: Number,
  count: Number,
  dateCreated: Date
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
