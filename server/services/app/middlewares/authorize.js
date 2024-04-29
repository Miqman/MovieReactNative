const { Movie } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMovie = await Movie.findByPk(id);

    if (!getMovie) {
      throw { name: "Not Found" };
    } else {
      if (req.user.role === "admin") {
        next();
      } else {
        if (req.user.id === getMovie.authorId) {
          next();
        } else {
          throw { name: "Forbiden", statusCode: 403 };
        }
      }
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authorization;
