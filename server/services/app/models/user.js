"use strict";
const { Model } = require("sequelize");
const { createPassWihtHash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "Must be format email" },
          notEmpty: { msg: "Require Email" },
          notNull: { msg: "Require Email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Require Password" },
          notNull: { msg: "Password cant empty" },
          isPassword(value) {
            let pass = value.length;
            if (pass < 5) {
              throw new Error("Minimal input password 5");
            }
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  //hooks
  User.beforeCreate((ins, ops) => {
    ins.password = createPassWihtHash(ins.password);
  });
  return User;
};
