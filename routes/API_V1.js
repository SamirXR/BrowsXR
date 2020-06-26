const http = require("http");
const express = require("express");
const engine = require('../engine/');

const Router = new express.Router();

Router.get("/api/v1/search/:search_query", (req, res) =>  {
  const search_query = req.params.search_query;
  const results = engine.search(search_query);
  res.json(results);
});

Router.get("/api/v1/craw/:url", (req, res) => {
  let url = req.params.url;
  if (url.includes("http://") || url.includes("https://")) {
    url = url.split("://")[1];
  }
  
  let client = http.createClient(80, url);
  let request = client.request();
  request.on('response', function( res ) {
    res.on('data', function( data ) {
        console.log( data );
    });
} );
})

Router.get("/api/v1/*", (req, res) => {
  res.json({
    message: "Not api endpoint specified",
    error: "404 Not Found",
    code: 404
  })
})

module.exports = Router;