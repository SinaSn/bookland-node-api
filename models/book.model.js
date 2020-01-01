const Author = require("./author.model");
const Publisher = require("./publisher.model");
const Genre = require("./genre.model");
const User = require("./user.model");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookCode: String,
  title: String,
  description: String,
  author: Author,
  publisher: Publisher,
  genre: Genre,
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
  likers: [User],
  coverImage: String,
  enabled: Boolean,
  dateCreated: Date
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
