const Slider = require("../models/slider.model");
const Category = require("../models/category.model");
const Book = require("../models/book.model");

async function getUserInfo() {
  try {
    var authorFirstName = null,
      authorLastName = null;

    if (filter.author && filter.author.split("-").length == 2) {
      authorFirstName = filter.author.split("-")[0];
      authorLastName = filter.author.split("-")[1];
    }

    if (filter.minPrice > filter.maxPrice) {
      return {
        status: false,
        message: "بازه قیمت صحیح نیست",
        data: null
      };
    }

    var filterArr = {
      title: { $regex: filter.title || /\s*/ },
      "author.firstName": { $regex: authorFirstName || /\s*/ },
      "author.lastName": { $regex: authorLastName || /\s*/ },
      "publisher.title": { $regex: filter.publisher || /\s*/ },
      "genre.title": { $regex: filter.genre || /\s*/ },
      price: { $gte: 0, $lte: Infinity },
      language: filter.language || /\s*/,
      coverType: { $regex: filter.coverType || /\s*/ },
      format: { $regex: filter.format || /\s*/ }
    };

    var asc = filter.sort ? 1 : -1;
    var books = await Book.find(filterArr).sort(["dateCreated", asc]);

    if (books.length == 0) {
      return {
        status: false,
        message: "نتیجه‌ای یافت نشد",
        data: null
      };
    }

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: books
    };
  } catch (err) {
    return {
      status: false,
      message: "پارامترهای ارسالی صحیح نمی‌باشد",
      data: null
    };
  }
}

async function getBasicInfo() {
  try {
    var sliders = await Slider.find({ enabled: true });
    var categories = await Category.find();
    var latestBooks = await Book.find({ enabled: true })
      .sort("-dateCreated")
      .limit(10);
    var popularBooks = await Book.find({ enabled: true })
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
