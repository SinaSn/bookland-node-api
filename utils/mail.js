var nodemailer = require("nodemailer");

function sendEmail(to, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sinasn.tj@gmail.com",
      pass: "ssn19960602"
    }
  });

  var mailOptions = {
    from: "sinasn.tj@gmail.com",
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
