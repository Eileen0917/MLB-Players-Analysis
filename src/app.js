require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.get("", (req, res) => {
  res.send("hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(db.run);
});
