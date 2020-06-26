const search_engine = require('search-engine-nodejs').default;

const express = require("express");
const Router = new express.Router();

Router.get("/search/:search_query", (req, res) =>  {
  res.end(req.params.search_query)
});

function search (query) {
  (async () => {
    const options = {
        pageOfResult: 2,
        qs: {
            q: 'Hello Search Engine'
        }
    }
 
    // you can use: Aol, Ask, Baidu, Bing, Google or Yahoo
    const results = await search_engine.Google(options)
    console.log(results)
    // This will display the second results page
})();
}

module.exports = Router;