const parser = require('node-html-parser');
const parse = parser.parse;

exports.getContent = (url) => {
    return new Promise((resolve, reject) => {
        const http      = require('http'),
              https     = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};

exports.getFavicon = (dom) => {
  let favicon = null;
  let nodeList = dom.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++) {
    if ((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon")) {
      favicon = nodeList[i].getAttribute("href");
    }
  }
  
  return favicon;
}

exports.getDescription = (dom) => {
  let desc = null;
  let nodeList = dom.getElementsByTagName("meta");
  for (var i = 0; i < nodeList.length; i++) {
    if ((nodeList[i].getAttribute("name") == "description") && (nodeList[i].getAttribute("content") != null)) {
      desc= nodeList[i].getAttribute("content");
    }
  }
  
  return desc;
}

exports.getData = async (url) => {
  return new Promise(async (resolve, reject) => {
    
    let content = await this.getContent(url);
    
    let favicon;//this.getFavicon(dom);
    let description;//this.getDescription(dom);
    
    resolve({favicon, description})
    
  });
}