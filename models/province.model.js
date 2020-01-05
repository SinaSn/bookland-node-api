const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provinceSchema = new Schema({
  title: String,
  cities: [
    new Schema({
      title: String
    })
  ]
});

const Province = mongoose.model("Province", provinceSchema);

module.exports = Province;
