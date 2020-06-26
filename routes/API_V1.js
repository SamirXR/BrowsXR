const http = require("http");
const express = require("express");
const engine = require('../engine/');
const craw = require("../utils/web-craw");

const Router = new express.Router();

Router.get("/search/:search_query", (req, res) =>  {
  const search_query = req.params.search_query;
  const results = engine.search(search_query);
  res.json(results);
});

Router.get("/craw/:url", async (req, res) => {
  let url = req.params.url;
  let content = craw.getContent(url);
  
  let data = await craw.getData(url);
  res.json(data);
})

Router.get("*", (req, res) => {
  res.json({
    message: "Not api endpoint specified",
    error: "404 Not Found",
    code: 404
  })
})

module.exports = Router;