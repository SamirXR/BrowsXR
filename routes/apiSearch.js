const search_engine = require('search-engine-nodejs').default;
const searchGoogle = require('../utils/searchGoogle');

const express = require("express");
const Router = new express.Router();

Router.get("/api/search/:search_query", (req, res) =>  {
  const search_query = req.params.search_query;
  searchGoogle(search_query)
            .then(results => {
                //Returns a 200 Status OK with Results JSON back to the client.
                res.status(200);
                console.log(results);
                res.json(results);
            });
  /*
  search(search_query, (results) => {
    res.json(results);
  })
  */
});

function search (search_query, callback) {
  (async () => {
    const options = {
        qs: {
            q: search_query
        }
    }
 
    const results = await search_engine.Bing(options);
    callback(results);
    console.log(results);
  })();
}

module.exports = Router;