const bcrypt = require("bcrypt");

function createHash(pass) {
  return bcrypt.hashSync(pass, 8);
}

function comparePassHash(inputPass, fromDb) {
  return bcrypt.compareSync(inputPass, fromDb);
}

module.exports = { createHash, comparePassHash };
