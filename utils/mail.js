var nodemailer = require("nodemailer");
var config = require("../configs/index");

function sendEmail(to, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.emailUser,
      pass: config.emailPass
    }
  });

  var mailOptions = {
    from: config.emailUser,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
