const Book = require("../models/book.model");

async function getBooks(filter) {
  try {
    var authorFirstName = null,
      authorLastName = null;

    if (filter.author && filter.author.split("-").length == 2) {
      authorFirstName = filter.author.split("-")[0];
      authorLastName = filter.author.split("-")[1];
    }

    var filterArr = {
      title: filter.title || /\s*/,
      "author.firstName": authorFirstName || /\s*/,
      "author.lastName": authorLastName || /\s*/,
      "publisher.title": filter.publisher || /\s*/,
      "genre.title": filter.genre || /\s*/,
      price: { $gte: 0, $lte: Infinity },
      language: filter.language || /\s*/,
      coverType: filter.coverType || /\s*/,
      format: filter.format || /\s*/
    };

    var books = await Book.find(filterArr);

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
