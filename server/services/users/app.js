const express = require("express");
const { connection } = require("./config/mongoConnection");
const app = express();

const port = process.env.PORT || 3001;
const index = require("./routes/index");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/users", index);

connection().then(async () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
