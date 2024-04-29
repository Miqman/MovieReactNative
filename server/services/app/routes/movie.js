const express = require("express");
const MovieController = require("../controllers/movieController");
const authentication = require("../middlewares/authen");
const authorization = require("../middlewares/authorize");
const router = express.Router();

// router.use(authentication);

// define the home page route
router.get("/", MovieController.getMovies);
// define the about route
router.get("/own", MovieController.oneMovie);

// router.get("/cast", MovieController.castMovie);

router.get("/genre", MovieController.genreMovie);

router.post("/addMovie", MovieController.postMovie);

router.put("/:id", MovieController.putMovie);

router.get("/:id", MovieController.showIdMovie);

router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
