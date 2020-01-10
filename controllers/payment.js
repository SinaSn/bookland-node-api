const Book = require("../models/book.model");
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

  let bookArr = bookIds.split("/");
  for (let i = 0; i < bookArr.length; i++) {
    amount += await Book.findById(bookArr[i])
      .exec()
      .then(function(book) {
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
    .then(function(res) {
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
