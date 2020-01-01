const fs = require("fs");
const jwt = require("jsonwebtoken");

module.exports = {
  isAuthenticated: function(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization.split(" ")[1];
      let privateKey = fs.readFileSync("./data/private.pem", "utf8");

      jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
        if (err) {
          res.status(500).json({
            status: false,
            message: "احراز هویت انجام نشد",
            data: null
          });
          throw new Error("Not Authorized");
        }
        return next();
      });
    } else {
      res
        .status(500)
        .json({ status: false, message: "احراز هویت انجام نشد", data: null });
      throw new Error("Not Authorized");
    }
  }
};
