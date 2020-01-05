const Author = require("./author.model").schema;
const Publisher = require("./publisher.model").schema;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookCode: String,
  title: String,
  description: String,
  author: Author,
  publisher: Publisher,
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  isbn: String,
  count: Number,
  price: Number,
  language: String,
  weight: Number,
  discount: Number,
  translator: String,
  format: String,
  pages: Number,
  coverType: String,
  releaseYear: Number,
  publishTimes: Number,
  likers: { type: Schema.Types.ObjectId, ref: "users" },
  coverImage: String,
  enabled: Boolean,
  dateCreated: Date
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
