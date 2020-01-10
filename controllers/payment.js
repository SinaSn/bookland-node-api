const Book = require("../models/book.model");
const Cart = require("../models/cart.model");
const Payment = require("../models/payment.model");
var ZarinpalCheckout = require("../utils/zarinpal");

async function payment({ userId, bookIds, discount, description, email }) {
  if (!(userId || bookIds || description || email)) {
    return {
      status: false,
      message: "پارامترهای ارسالی صحیح نیست",
      data: null
    };
  }

  let amount = 0;
  let _discount = 1;
  if (discount && discount !== "") {
    _discount = discount;
  }

  let books = [];

  let bookArr = bookIds.split("/");
  for (let i = 0; i < bookArr.length; i++) {
    amount += await Book.findById(bookArr[i])
      .exec()
      .then(function(book) {
        books.push(book);
        return book.price;
      });
  }
  amount -= amount * _discount;

  var zarinpal = ZarinpalCheckout.create(
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    true
  );

  let result = await zarinpal
    .PaymentRequest({
      Amount: amount,
      CallbackURL: "http://localhost:3000/api/v1/payment/verify",
      Description: description,
      Email: email
    })
    .then(async function(res) {
      var newCart = new Cart({
        userId: userId,
        books: books,
        price: amount,
        count: bookArr.length,
        dateCreated: Date.now()
      });

      var newPayment = new Payment({
        user: userId,
        cart: newCart,
        price: amount,
        succeeded: false,
        refNumber: res.authority,
        dateCreated: Date.now(),
        reservedUntil: Date.now() + 15 * 60 * 1000
      });

      await newPayment.save();

      return res;
    })
    .catch(function(err) {
      return err.response.body;
    });

  return {
    status: true,
    message: "عملیات با موفقیت انجام شد",
    data: result
  };
}

async function verify({ authority, status }) {
  if (status === "OK") {
    let payment = await Payment.findOne({ refNumber: authority }).exec();
    payment.succeeded = true;
    await payment.save();

    return {
      status: true,
      message: "عملیات با موفقیت انجام شد",
      data: { authority, status }
    };
  }

  return {
    status: false,
    message: "پرداخت ناموفق",
    data: { authority, status }
  };
}

module.exports = {
  payment,
  verify
};
