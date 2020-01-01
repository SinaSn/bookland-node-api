const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  firstName: String,
  lastName: String,
  biography: String,
  gender: Boolean
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
