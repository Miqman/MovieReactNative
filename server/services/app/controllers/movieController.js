const { Movie, User, Genre, Cast } = require("../models/index");
const { sequelize } = require("../models/index");

class MovieController {
  static async getMovies(req, res, next) {
    try {
      const fetchMovie = await Movie.findAll({
        include: [
          { model: Genre, attributes: ["name"] },
          { model: Cast, attributes: ["name", "profilePict"] },
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
      const { id } = req.user;
      const getOneMovie = await Movie.findAll({
        where: { authorId: id },
      });
      res.status(200).json({
        Code: 200,
        data: getOneMovie,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async showIdMovie(req, res, next) {
    try {
      const { id } = req.params;

      const idMovie = await Movie.findByPk(id, {
        include: [
          { model: Genre, attributes: ["name"] },
          { model: Cast, attributes: ["name", "profilePict"] },
        ],
      });
      if (idMovie <= 0) {
        throw { name: "Not Found" };
      }

      const castMovie = await Cast.findAll({ where: { movieId: idMovie.id } });

      res.status(200).json({
        Code: 200,
        data: { idMovie, castMovie },
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async postMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      // const { id } = req.user;
      let { profilePict, name } = req.body;
      let castData = [];
      // console.log(req.body, "======");

      // const getUser = await User.findByPk(id, { transaction: t });

      // if (!getUser) {
      //   throw { name: "User Not Found" };
      // }
      const newMovie = await Movie.create(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          authorId: 1,
          UserMongoId: "627ccb58d40b4b7407fc087e",
        },
        { transaction: t }
      );

      if (typeof profilePict === "string") {
        profilePict = [profilePict];
      }
      if (typeof name === "string") {
        name = [name];
      }

      if (profilePict.length != name.length) {
        throw { msg: "jumlah pict dan name harus sama" };
      }

      for (let i = 0; i < profilePict.length; i++) {
        castData.push({
          movieId: newMovie.id,
          name: name[i],
          profilePict: profilePict[i],
        });
      }

      await Cast.bulkCreate(castData, { transaction: t });

      await t.commit();
      res.status(201).json({
        msg: "Create success",
        data: newMovie,
      });
    } catch (error) {
      await t.rollback();
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

  static async putMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id } = req.params;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      let { name, profilePict } = req.body;
      const castData = [];

      const editMovie = await Movie.update(
        {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
        },
        { where: { id: id }, transaction: t }
      );

      if (editMovie <= 0) {
        throw { name: "Not Found" };
      }

      const newMovie2 = await Movie.findOne({
        where: { id: id },
        transaction: t,
      });

      if (newMovie2 <= 0) {
        throw { name: "Not Found" };
      }

      // if (typeof name === "Array") {
      //   name = name[0];
      //   profilePict = profilePict[0];
      // }
      await Cast.destroy({ where: { movieId: newMovie2.id } });

      for (let i = 0; i < profilePict.length; i++) {
        castData.push({
          movieId: newMovie2.id,
          name: name[i],
          profilePict: profilePict[i],
        });
      }
      const newCast = await Cast.bulkCreate(castData);

      await t.commit();
      res.status(200).json({
        Code: 200,
        data: newMovie2,
      });
    } catch (error) {
      await t.rollback(),
        // console.log(error);
        next(error);
    }
  }

  static async castMovie(req, res, next) {
    try {
      // const getCast = await Cast.findAll()
      // res.status(200).json()
    } catch (error) {}
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;

      const getMovie = await Movie.findByPk(id);
      if (getMovie <= 0) {
        throw { name: "Not Found" };
      }

      await Movie.destroy({ where: { id } });

      res.status(200).json({
        Code: 200,
        msg: `delete movie with id ${id} success`,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = MovieController;
