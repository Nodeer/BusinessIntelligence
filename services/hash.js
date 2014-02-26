var crypto = require("crypto-js");

module.exports = function (password, salt) {
    return crypto.SHA256(password + salt).toString(crypto.enc.Hex);
};