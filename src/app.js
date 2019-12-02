require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
// const axios = require("axios");
const budget = require("./budget");
const rated = require("./rated");
const improvement = require("./improvement");
const velicity = require("./velicity");
const quality = require("./quality");

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

var r1;

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main"
  });
});

// budget
app.get("/budget", (req, res) => {
  res.render("budget", {
    title:
      "Do a higher budget team that has more star players or high salary players on the team promise more wins?"
  });
});

app.get("/getBudget", (req, res) => {
  budget.run().then(result => {
    res.json(result);
  });
});

// rated
app.get("/rated", (req, res) => {
  res.render("rated", {
    title: "Overrated or Underrated? "
  });
});

app.get("/getRated", (req, res) => {
  rated.run().then(result => {
    res.json(result);
  });
});

// improvement
app.get("/improvement", (req, res) => {
  res.render("improvement", {
    title:
      "Does a player get more skillful and gain better performance according to the game played in the league? How many of them match this pattern?"
  });
});

app.get("/getImprovement", (req, res) => {
  improvement.run().then(result => {
    res.json(result);
  });
});

// pitching-velicity
app.get("/pitching-velocity", (req, res) => {
  res.render("velicity", {
    title:
      "Under what condition that a pitcher is more likely to throw harder and faster to increase the pitching velocity during a baseball game?"
  });
});

app.get("/getVelicity", (req, res) => {
  velicity.run().then(result => {
    res.json(result);
  });
});

// pitching-quality
app.get("/pitching-quality", (req, res) => {
  res.render("quality", {
    title:
      "Does the pitching quality of pitchers changes in every game for a period of consecutive game season?"
  });
});

app.get("/getQuality", (req, res) => {
  quality.run().then(result => {
    res.json(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log("connected.");
});
