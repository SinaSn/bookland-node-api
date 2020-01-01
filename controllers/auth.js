const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const generateRandomNumber = require("../utils/numbers");
const sendEmail = require("../utils/mail");
const moment = require("jalali-moment");

module.exports = {
  register: async function(req, res) {
    if (!(req.body.nickname && req.body.email && req.body.password)) {
      return {
        status: false,
        message: "پارامترهای ارسالی معتبر نمی باشد",
        data: null
      };
    }

    var userExists = await User.exists({
      email: { $eq: req.body.email }
    });

    if (userExists) {
      return {
        status: false,
        message: "این کاربر قبلا ثبت نام کرده است.",
        data: null
      };
    } else {
      var verificationCode = generateRandomNumber(10000, 99999);
      var now = Date.now() + 210 * 60 * 1000;

      var newUser = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        verificationCode: verificationCode,
        confirmed: false,
        dateJoined: now + 210 * 60 * 1000
      });

      await newUser.save();

      let privateKey = fs.readFileSync("./data/private.pem", "utf8");
      let token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        privateKey,
        { algorithm: "HS256" }
      );

      sendEmail(
        req.body.email,
        "کد فعال‌سازی",
        "کد فعال‌سازی بوک‌لند: " + verificationCode
      );

      return {
        status: true,
        message: "عملیات با موفقیت انجام شد",
        data: { verificationCode, token }
      };
    }
  },
  login: async function(req, res) {
    if (!(req.body.email && req.body.password)) {
      return {
        status: false,
        message: "پارامترهای ارسالی معتبر نمی باشد",
        data: null
      };
    }

    var user = await User.findOne({
      email: { $eq: req.body.email },
      password: { $eq: req.body.password }
    });

    if (!user) {
      return {
        status: false,
        message: "چنین کاربری وجود ندارد",
        data: null
      };
    }

    var verificationCode = generateRandomNumber(10000, 99999);
    user.verificationCode = verificationCode;
    await user.save();

    sendEmail(
      req.body.email,
      "کد فعال‌سازی",
      "کد فعال‌سازی بوک‌لند: " + verificationCode
    );

    let privateKey = fs.readFileSync("./data/private.pem", "utf8");
    let token = jwt.sign(
      { email: req.body.email, password: req.body.password },
      privateKey,
      { algorithm: "HS256" }
    );

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: { token }
    };
  },
  verify: async function(req, res) {
    if (!req.body.verificationCode) {
      return {
        status: false,
        message: "پارامترهای ارسالی معتبر نمی باشد",
        data: null
      };
    }

    var user = await User.findOne({ email: req.email, password: req.password });
    user.confirmed = true;
    await user.save();

    return { status: true, message: "عملیات با موفقیت انجام شد", data: true };
  }
};
