const Book = require("../models/book.model");
const Comment = require("../models/comment.model");

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

async function getBookInfo({ id }) {
  if (id === undefined) {
    return {
      status: false,
      message: "پارامترهای ارسالی صحیح نیست",
      data: null
    };
  }

  var book = await Book.findById(id);

  if (book == null) {
    return {
      status: false,
      message: "چنین کتابی وجود ندارد",
      data: null
    };
  }

  return {
    status: true,
    message: "عملیات با موفقیت انجام شد",
    data: book
  };
}

async function getAuthors({ author }) {
  try {
    var authorFirstName = null,
      authorLastName = null;

    if (author && author.split("-").length == 2) {
      authorFirstName = author.split("-")[0];
      authorLastName = author.split("-")[1];
    }

    var filterArr = {
      "author.firstName": { $regex: authorFirstName || /\s*/ },
      "author.lastName": { $regex: authorLastName || /\s*/ }
    };

    var books = await Book.find(filterArr).select("author");

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

async function getComments({ bookId }) {
  try {
    var comments = await Comment.find({ book: bookId, confirmed: true });

    if (comments.length == 0) {
      return {
        status: false,
        message: "نظری ثبت نشده است",
        data: null
      };
    }

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: comments
    };
  } catch (err) {
    return {
      status: false,
      message: "پارامترهای ارسالی صحیح نمی‌باشد",
      data: null
    };
  }
}

async function submitComment({ title, text, bookId, userId }) {
  try {
    var now = Date.now() + 210 * 60 * 1000;

    var comment = new Comment({
      title,
      text,
      user: userId,
      book: bookId,
      confirmed: false,
      dateCreated: now
    });

    await comment.save();

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: comment
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: "پارامترهای ارسالی صحیح نمی‌باشد",
      data: null
    };
  }
}

module.exports = {
  getBooks,
  getBookInfo,
  getComments,
  getAuthors,
  submitComment
};
