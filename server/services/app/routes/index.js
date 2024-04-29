const express = require("express");
const router = express.Router();
const user = require("./user");
const movie = require("./movie");
const customer = require("./customer");

// define the home page route
router.use("/users", user);
// define the about route
router.use("/movies", movie);

router.use("/customers", customer);

module.exports = router;
