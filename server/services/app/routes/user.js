const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

// define the home page route
router.post("/register", UserController.register);
// define the about route
router.post("/login", UserController.login);

module.exports = router;
