const bcrypt = require("bcrypt");

function createPassWihtHash(pass) {
  return bcrypt.hashSync(pass, 8);
}

function comparePassInput(inputPass, dbPass) {
  return bcrypt.compareSync(inputPass, dbPass);
}

module.exports = { createPassWihtHash, comparePassInput };
