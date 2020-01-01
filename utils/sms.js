const axios = require("axios").default;
const configs = require("../configs");

async function getToken() {
  return await axios({
    url: "https://RestfulSms.com/api/Token",
    method: "post",
    data: {
      UserApiKey: configs.smsUserApiKey,
      SecretKey: configs.smsSecretKey
    },
    headers: { "Content-Type": "application/json" }
  }).then(function(res) {
    return JSON.stringify(res.data);
  });
}

async function sendSMS(mobileNumbers, messages) {
  var token = JSON.parse(await getToken()).TokenKey;
  return await axios({
    url: "https://RestfulSms.com/api/MessageSend",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-sms-ir-secure-token": token
    },
    data: {
      Messages: messages,
      MobileNumbers: mobileNumbers,
      LineNumber: configs.smsLineNumber,
      SendDateTime: "",
      CanContinueInCaseOfError: "false"
    }
  }).then(function(res) {
    return res.data;
  });
}

module.exports = sendSMS;
