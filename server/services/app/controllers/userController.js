const { comparePassInput } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const sequelize = require("sequelize");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        Code: 201,
        data: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      //   console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(req.body, "=================");
      const getUserLogin = await User.findOne({
        where: { email },
      });
      if (!email) {
        throw { name: "need_email" };
      }
      if (!password) {
        throw { name: "need_password" };
      }

      if (!getUserLogin) {
        throw { name: "E/P_not_Valid" };
      }
      const getValidUser = comparePassInput(password, getUserLogin.password);

      if (!getValidUser) {
        throw { name: "E/P_not_Valid" };
      }

      const payload = { id: getUserLogin.id };
      // console.log(payload);

      const access_token = createToken(payload);
      //balikin data
      res.status(200).json({
        statusCode: 200,
        access_token: access_token,
        id: getUserLogin.id,
        role: getUserLogin.role,
        name: getUserLogin.username,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
