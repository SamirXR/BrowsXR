const http = require('http'), https = require('https');

exports.proxyConnection = (url, req, res) => {
  let client = http;
  if (url.startsWith("https://")) 
    client = https;
  
  let hostname = (url.includes("://") ? url.split("://")[1] : url).split("/")[0];
  let port = (url.includes("https://") ? 443 : 80);
  let path = url.split(hostname)[1];
  
  console.log(url);
  
  let options = {
    hostname:   hostname, 
    port:   port,
    path:   path,
    method: 'GET',
    headers: req.headers
  };
  
  var creq = http.request(options, function(cres) {
    cres.setEncoding('utf8');
    
    cres.on('data', function(chunk){
      res.write(chunk);
    });
    
    cres.on('close', function(){
      res.end();
    });
    
    cres.on('end', function(){
      // finished, let's finish client request as well 
      res.end();
    });
  }).on('error', function(e) {
    // we got an error, return 500 error to client and log error
    console.log(e.message);
    res.writeHead(500);
    res.end();
  });
  
  creq.end();
  
}