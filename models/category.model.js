const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: String,
  subCategories: [
    new Schema({
      title: String
    })
  ]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
