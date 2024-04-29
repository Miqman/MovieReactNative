const { Movie, User, Genre, Cast } = require("../models/index");

class CustomerController {
  static async getMovies(req, res, next) {
    try {
      const fetchMovie = await Movie.findAll({
        order: ["updatedAt"],
        include: [
          { model: Genre, attributes: ["id", "name"] },
          { model: User, attributes: ["id", "username"] },
        ],
      });

      res.status(200).json({
        Code: 200,
        data: fetchMovie,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async oneMovie(req, res, next) {
    try {
      const { id } = req.params;
      const getOneMovie = await Movie.findByPk(id, {
        include: [{ model: Genre, attributes: ["name"] }],
      });

      if (getOneMovie <= 0) {
        throw { name: "Not Found" };
      }

      const castMovie = await Cast.findAll({
        where: { movieId: getOneMovie.id },
      });

      const genreMovie = await Genre.findOne({
        where: { id: getOneMovie.genreId },
      });
      res.status(200).json({
        Code: 200,
        data: { getOneMovie, castMovie, genreMovie },
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async genreMovie(req, res, next) {
    try {
      const getGenre = await Genre.findAll();
      res.status(200).json({
        Code: 200,
        data: getGenre,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
