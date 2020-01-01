const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
var { DuplicateUserError } = require("../utils/errors");

module.exports = {
  register: async function(req, res) {
    var result = {},
      errors = [];

    if (!(req.body.nickname && req.body.username && req.body.password)) {
      return {
        status: false,
        message: "پارامترهای ارسالی معتبر نمی باشد",
        data: null
      };
    }

    var userExists = await User.exists({
      username: { $eq: req.body.username }
    });

    if (userExists) {
      return {
        status: false,
        message: "این کاربر قبلا ثبت نام کرده است.",
        data: null
      };
    } else {
      var newUser = new User({
        nickname: req.body.nickname,
        username: req.body.username,
        password: req.body.password
      });

      var result = await newUser.save();

      let privateKey = fs.readFileSync("./data/private.pem", "utf8");
      let token = jwt.sign(
        { username: req.body.username, password: req.body.password },
        privateKey,
        { algorithm: "HS256" }
      );

      return {
        status: true,
        message: "عملیات با موفقیت انجام شد",
        data: { username: req.body.username, token }
      };
    }
  },
  login: function(req, res) {
    if (!(req.body.username && req.body.password)) {
      res.status(400).json({
        status: false,
        message: "پارامترهای ارسالی معتبر نمی باشد",
        data: null
      });
      throw new Error("Bad Request");
    }
    let privateKey = fs.readFileSync("./data/private.pem", "utf8");
    let token = jwt.sign(
      { username: req.body.username, password: req.body.password },
      privateKey,
      { algorithm: "HS256" }
    );
    return { status: true, message: "عملیات با موفقیت انجام شد", data: token };
  },
  verify: function(req, res) {
    if (!(req.body.username && req.body.password)) {
      res.status(400).json({
        status: false,
        message: "پارامترهای ارسالی معتبر نمی باشد",
        data: null
      });
      throw new Error("Bad Request");
    }
    let privateKey = fs.readFileSync("./data/private.pem", "utf8");
    let token = jwt.sign(
      { username: req.body.username, password: req.body.password },
      privateKey,
      { algorithm: "HS256" }
    );
    return { status: true, message: "عملیات با موفقیت انجام شد", data: token };
  }
};
