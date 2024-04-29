const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://miqman:Terserah02@cluster0.fk5l0.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

let dbMovie;
async function connection() {
  try {
    await client.connect();
    dbMovie = client.db("Microservices");
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return dbMovie;
}

module.exports = { connection, getDb };
