const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  port: 16033, // Redis port
  host: "redis-16033.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "qveMlqG2GiuCKmn7Yb3x21kzYTL3cSu6",
});

// https://movieman-service-user.herokuapp.com/
// https://moviemanapp-service-app.herokuapp.com/
// http://localhost:3000
// http://localhost:3001
const urlMovie = "https://moviemanapp-service-app.herokuapp.com";
const urlUser = "https://movieman-service-user.herokuapp.com";

const typeDefs = gql`
  type genre {
    name: String
  }
  type caster {
    name: String
    profilePict: String
  }

  type user {
    id: ID
    username: String
    email: String
  }
  type Movies {
    id: ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: String
    genreId: Int
    authorId: Int
    UserMongoId: String
    Genre: genre
    Casts: [caster]
    User: user
  }
  type Genres {
    id: ID
    name: String
  }

  input MovieInput {
    title: String

    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: String
    genreId: Int
    name: [String]
    profilePict: [String]
  }
  type Query {
    getMovie: [Movies]
    getOneMovie(id: ID): Movies
    getGenre: [Genres]
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movies
    editMovie(id: ID, newMovie: MovieInput): Movies
    removeMovie(id: ID): Movies
  }
`;

const resolvers = {
  Query: {
    getMovie: async () => {
      try {
        const movieCache = await redis.get("movieCache");

        if (!movieCache) {
          const { data } = await axios.get(`${urlMovie}/movies`);
          const movies = data.data;

          await redis.set("movieCache", JSON.stringify(movies));
          return movies;
        } else {
          return JSON.parse(movieCache);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getOneMovie: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.get(`${urlMovie}/movies/${id}`);
        // console.log(data.data, "====");
        const movie = data.data.idMovie;

        const { data: user } = await axios.get(
          `${urlUser}/users/${movie.UserMongoId}`
        );
        // console.log(user, "=====");
        movie.User = user;

        return movie;
      } catch (error) {
        console.log(error);
      }
    },

    getGenre: async () => {
      try {
        const { data } = await axios.get(`${urlMovie}/movies/genre`);

        const genre = data.data;
        // console.log(genre);
        return genre;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addMovie: async (_, args) => {
      try {
        const dataBody = args.newMovie;
        const { data } = await axios.post(
          `${urlMovie}/movies/addMovie`,
          dataBody
        );

        // console.log(args.newUser, "=======");
        await redis.del("movieCache");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editMovie: async (_, args) => {
      try {
        const id = args.id;
        const dataBody = args.newMovie;
        const { data } = await axios.put(`${urlMovie}/movies/${id}`, dataBody);

        // console.log(args.newUser, "=======");
        await redis.del("movieCache");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    removeMovie: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${urlMovie}/movies/${id}`);
        await redis.del("movieCache");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
