exports.hash = function (password, salt) {
    var SHA256 = require("crypto-js/sha256");
    return SHA256(password + salt);
};