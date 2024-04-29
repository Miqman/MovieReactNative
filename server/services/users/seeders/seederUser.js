const { MongoClient } = require("mongodb");
const data = require("./Users__202205121509.json");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("Microservices");
    const users = database.collection("User");
    // Query for a movie that has the title 'Back to the Future'

    const options = { ordered: true };

    const result = await users.insertMany(data, options);
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
