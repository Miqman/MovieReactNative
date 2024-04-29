"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cant be empty" },
          notNull: { msg: "Title cant be null" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Slug cant be empty" },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Synopsis cant be empty" },
          notNull: { msg: "Synopsis cant be empty" },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Minimal rating 1",
          },
        },
      },
      genreId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      UserMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  //hooks
  Movie.beforeCreate((ins, ops) => {
    let newTitle = ins.title.split(" ").join("-");
    ins.slug = newTitle;
  });
  return Movie;
};
