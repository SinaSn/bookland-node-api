module.exports = {
  // Server
  port: process.env.PORT || 3000,
  connectionString: "mongodb://localhost/bookland",
  // SMS Service
  smsLineNumber: "50002015445043",
  smsUserApiKey: "3d230584a86371a163490584",
  smsSecretKey: "ssn@19960602",
  // Email Service
  emailUser: "sinasn.tj@gmail.com",
  emailPass: "ssn19960602",
  // Payment
  tax: 0.06,
  toll: 0.03,
  // ZarinPal
  https: "https://www.zarinpal.com/pg/rest/WebGate/",
  sandbox: "https://sandbox.zarinpal.com/pg/rest/WebGate/",
  merchantIDLength: 36,
  API: {
    PR: "PaymentRequest.json",
    PRX: "PaymentRequestWithExtra.json",
    PV: "PaymentVerification.json",
    PVX: "PaymentVerificationWithExtra.json",
    RA: "RefreshAuthority.json",
    UT: "UnverifiedTransactions.json"
  },
  PG: function(sandbox) {
    if (sandbox) {
      return "https://sandbox.zarinpal.com/pg/StartPay/";
    }
    return "https://www.zarinpal.com/pg/StartPay/";
  }
};
