const express = require('express');
const Router = new express.Router();

Router.get("/search", (req, res) => {
  res.render("index.ejs");
})

Router.get("/search:params", (req, res) => {
  res.render("search.ejs");
})


module.exports = Router;