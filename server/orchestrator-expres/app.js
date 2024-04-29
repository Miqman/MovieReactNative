const axios = require("axios");
const express = require("express");
const app = express();
const Redis = require("ioredis");

const port = process.env.port || 3002;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const urlUser = "http://localhost:3001";
const urlMovie = "http://localhost:3000";

const redis = new Redis({
  port: 16033, // Redis port
  host: "redis-16033.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "qveMlqG2GiuCKmn7Yb3x21kzYTL3cSu6",
});

//redis-16033.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:16033

app.get("/movies", async (req, res) => {
  try {
    const movieCache = await redis.get("movieCache");

    if (!movieCache) {
      const { data } = await axios.get(`${urlMovie}/movies`);
      const movies = data.data;

      await redis.set("movieCache", JSON.stringify(movies));
      res.status(200).json(movies);
    } else {
      res.status(200).json(JSON.parse(movieCache));
    }
  } catch (error) {
    // console.log("masuk err");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/addMovie", async (req, res) => {
  try {
    // const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
    const dataBody = req.body;
    // console.log(dataBody);

    const postMovie = await axios.post(`${urlMovie}/movies/addMovie`, dataBody);
    // console.log(postMovie);
    await redis.del("movieCache");

    res.status(201).json(postMovie.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.put("/movies/:id", async (req, res) => {
  try {
    // const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
    const { id } = req.params;
    const dataBody = req.body;
    // console.log(dataBody);

    const putMovie = await axios.put(`${urlMovie}/movies/${id}`, dataBody);
    // console.log(postMovie);
    await redis.del("movieCache");

    res.status(200).json(putMovie.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // const oneMovieCache = await redis.get("oneMovieCache");

    // if (!oneMovieCache) {
    const { data } = await axios.get(`${urlMovie}/movies/${id}`);
    // console.log(data.data.idMovie);
    const getMovie = data.data.idMovie;

    const { data: user } = await axios.get(
      `${urlUser}/users/${getMovie.UserMongoId}`
    );
    getMovie.User = user;

    // await redis.set("oneMovieCache", JSON.stringify(oneMovieCache));
    res.status(200).json(getMovie);
    // } else {
    //   console.log(oneMovieCache);
    //   res.status(200).json(JSON.parse(oneMovieCache));
    // }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMovie = await axios.delete(`${urlMovie}/movies/${id}`);

    await redis.del("movieCache");

    res.status(200).json("deleteMovie success");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const userCache = await redis.get("userCache");

    if (!userCache) {
      const { data } = await axios.get(`${urlUser}/users`);

      await redis.set("userCache", JSON.stringify(data));
      res.status(200).json(data);
    } else {
      res.status(200).json(JSON.parse(userCache));
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(`${urlUser}/users/${id}`);
    // console.log(data.data.idMovie);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/users/add", async (req, res) => {
  try {
    const dataBody = req.body;
    console.log(dataBody);
    const { data } = await axios.post(`${urlUser}/users/addUser`, dataBody);
    // console.log(data.data.idMovie);

    await redis.del("userCache");
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.delete(`${urlUser}/users/${id}`);
    // console.log(data.data.idMovie);
    await redis.del("userCache");
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
