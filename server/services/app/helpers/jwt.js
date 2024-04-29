const jwt = require("jsonwebtoken");

const sKey = "ulaaa";

function createToken(payload) {
  return jwt.sign(payload, sKey, {
    expiresIn: "1h",
  });
}

function readToken(token) {
  return jwt.verify(token, sKey);
}

module.exports = { createToken, readToken };
