const Book = require("../models/book.model");

async function getBooks(filter) {
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

async function getAuthors(filter) {
  try {
    var filterArr = {
      "author.firstName": { $regex: authorFirstName || /\s*/ },
      "author.lastName": { $regex: authorLastName || /\s*/ }
    };

    console.log(filterArr);

    var books = await Book.find(filterArr).select("comments");

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

module.exports = {
  getBooks
};
