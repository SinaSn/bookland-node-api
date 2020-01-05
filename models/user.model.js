const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  nickname: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  nationalCode: String,
  postalCode: String,
  address: String,
  verificationCode: String,
  dateJoined: Date,
  phoneModel: String,
  appVersion: String,
  appBuildVersion: String,
  confirmed: Boolean,
  role: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
