var crypto = require("crypto");

module.exports = {
  encrypt: function(str) {
    var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
    var mystr = mykey.update(str, "utf8", "hex");
    mystr += mykey.final("hex");

    return mystr;
  },
  decrypt: function(hash) {
    var mykey = crypto.createDecipher("aes-128-cbc", "mypassword");
    var mystr = mykey.update(hash, "hex", "utf8");
    mystr += mykey.final("utf8");

    return mystr;
  }
};
