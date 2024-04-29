const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
// define the home page route
router.get("/", Controller.findAllUser);

router.post("/addUser", Controller.createUser);

router.get("/:id", Controller.findOneUser);

router.delete("/:id", Controller.deleteUser);

module.exports = router;
