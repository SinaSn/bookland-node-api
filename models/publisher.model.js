const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherSchema = new Schema({
  title: String,
  phone: String,
  address: String
});

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;
