const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  firstName: String,
  lastName: String,
  biography: String,
  gender: Boolean
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
