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
  let linkTag = dom.split("<link");
  let favicon = null;
  
  for (let tag of linkTag) {
    let domTag = tag.split(">")[0];
    let sanitizedTag = domTag.replace(/ /gi).replace(/\"/gi, "").replace(/\'/gi, "").replace(/\`/gi, "");
    if (sanitizedTag.includes("rel=icon") || sanitizedTag.includes("rel=shortcuticon")) {
      let obj = domTag.split("href=")[1];
      let char = obj[0];
      
      let url = obj.split(char)[1];
      favicon = url;
    }
  }
  
  let metaTag = dom.split("<meta");
  for (let tag of metaTag) {
    let domTag = tag.split(">")[0];
    let sanitizedTag = domTag.replace(/ /gi).replace(/\"/gi, "").replace(/\'/gi, "").replace(/\`/gi, "");
    console.log(sanitizedTag);
    if (sanitizedTag.includes("itemprop=image")) {
      let obj = domTag.split("content=")[1];
      let char = obj[0];
          
      let url = obj.split(char)[1];
      favicon = url;
    }
  }
  
  /*
  let favicon = null;
  let nodeList = dom.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++) {
    if ((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon")) {
      favicon = nodeList[i].getAttribute("href");
    }
  }*/
  
  return favicon;
}

exports.getDescription = (dom) => {
  let desc = null;
  /*
  let nodeList = dom.getElementsByTagName("meta");
  for (var i = 0; i < nodeList.length; i++) {
    if ((nodeList[i].getAttribute("name") == "description") && (nodeList[i].getAttribute("content") != null)) {
      desc= nodeList[i].getAttribute("content");
    }
  }*/
  
  return desc;
}

exports.getData = async (url) => {
  return new Promise(async (resolve, reject) => {
    
    let dom = await this.getContent(url);
    // console.log(dom)
    
    let favicon = this.getFavicon(dom);
    let description = this.getDescription(dom);
    
    if (!url.includes("://")) {
      url =?
    }
    
    if (!favicon.includes("://")) {
      if (!favicon.includes(url.split()))
    }
    
    resolve({favicon, description})
    
  });
}