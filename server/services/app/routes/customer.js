const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

// define the home page route
router.get("/movie", CustomerController.getMovies);
// define the about route
router.get("/genre", CustomerController.genreMovie);

router.get("/movie/:id", CustomerController.oneMovie);

module.exports = router;
