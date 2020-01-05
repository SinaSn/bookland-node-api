const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  title: String,
  url: String,
  image: String,
  dateCreated: Date,
  enabled: Boolean
});

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = Slider;
