const axios = require("axios");
const { createHash } = require("../helpers/bcrypt");
const User = require("../models/User");

class Controller {
  static async findAllUser(req, res, next) {
    try {
      const getUser = await User.findAll();
      res.status(200).json(getUser);
      //   console.log(getUser);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
  static async findOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const getUser = await User.findById(id);

      res.status(200).json({
        id: id,
        username: getUser.username,
        email: getUser.email,
      });
      //   console.log(getUser);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const newUser = await User.update({
        username,
        email,
        password: createHash(password),
        role: "Admin",
        phoneNumber,
        address,
      });
      res.status(201).json(newUser);
      //   console.log(getUser);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const status = await User.destroyOne(id);
      res.status(200).json(status);
      //   console.log(id);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
