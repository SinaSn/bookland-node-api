const Slider = require("../models/slider.model");
const Category = require("../models/category.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

async function getUserInfo(email) {
  try {
    let user = await User.findOne({email: email});

    if (!user) {
      return {
        status: false,
        message: "چنین کاربری وجود ندارد",
        data: null
      };
    }

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: user
    };
  } catch (err) {
    return {
      status: false,
      message: "خطای سرور",
      data: null
    };
  }
}

async function getBasicInfo() {
  try {
    let sliders = await Slider.find({enabled: true});
    let categories = await Category.find();
    let latestBooks = await Book.find({ enabled: true })
      .sort("-dateCreated")
      .limit(10);
    let popularBooks = await Book.find({ enabled: true })
      .sort({
        "likers.length": -1
      })
      .limit(10);

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: { sliders, categories, latestBooks, popularBooks }
    };
  } catch (err) {
    return {
      status: false,
      message: "خطای سرور",
      data: null
    };
  }
}

module.exports = {
  getUserInfo,
  getBasicInfo
};
