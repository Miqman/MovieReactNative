const { gql } = require("apollo-server");
const axios = require("axios");

const Redis = require("ioredis");

const redis = new Redis({
  port: 16033, // Redis port
  host: "redis-16033.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "qveMlqG2GiuCKmn7Yb3x21kzYTL3cSu6",
});

// https://movieman-service-user.herokuapp.com/
// https://moviemanapp-service-app.herokuapp.com/
const urlUser = "https://movieman-service-user.herokuapp.com";

const typeDefs = gql`
  type User {
    _id: String
    id: ID
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  input UserInput {
    username: String
    password: String
    email: String
    phoneNumber: String
    address: String
  }
  type Query {
    getUsers: [User]
    getOneUser(_id: String): User
  }

  type Mutation {
    addUser(newUser: UserInput): User
    removeUser(_id: String): User
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const userCache = await redis.get("userCache");

        if (!userCache) {
          const { data } = await axios.get(`${urlUser}/users`);
          // console.log(data, "====");
          await redis.set("userCache", JSON.stringify(data));
          return data;
        } else {
          return JSON.parse(userCache);
        }
      } catch (error) {
        console.log(error);
      }
    },

    getOneUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.get(`${urlUser}/users/${_id}`);
        // console.log(data, "====");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const { username, email, password, phoneNumber, address } =
          args.newUser;
        const { data } = await axios.post(`${urlUser}/users/addUser`, {
          username,
          email,
          password,
          phoneNumber,
          address,
        });

        // console.log(args.newUser, "=======");
        await redis.del("userCache");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    removeUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.delete(`${urlUser}/users/${_id}`);

        await redis.del("userCache");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
