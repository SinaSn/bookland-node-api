const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  text: String,
  user: { type: Schema.Types.ObjectId, ref: "users" },
  book: { type: Schema.Types.ObjectId, ref: "books" },
  confirmed: Boolean,
  dateCreated: Date
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
