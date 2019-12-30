const fs = require("fs");
const jwt = require("jsonwebtoken");

module.exports = {
  token: function(req, res) {
    if (!(req.body.username && req.body.password)) {
      // shut them out!
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
