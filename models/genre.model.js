const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = require("./category.model").schema;

const genreSchema = new Schema({
  title: String,
  category: Category
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
