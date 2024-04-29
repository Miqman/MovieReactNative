const { getDb } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

class User {
  static users() {
    const database = getDb();
    return database.collection("User");
  }
  static async findAll() {
    try {
      const users = await this.users().find().toArray();
      //   console.log(users);
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async findById(id) {
    try {
      const user = await this.users().findOne({
        _id: ObjectId(id),
      });
      //   console.log(users);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async update(data) {
    try {
      const createData = await this.users().insertOne(data);
      //   console.log(users);
      return createData;
    } catch (error) {
      throw error;
    }
  }

  static async updateMany(data) {
    try {
      const options = { ordered: true };
      const result = await this.users().insertMany(data, options);
      //   console.log(users);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async destroyOne(id) {
    try {
      id = ObjectId(id);
      const result = await this.users().deleteOne({ _id: id });
      //   console.log(users);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
