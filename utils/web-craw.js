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
      
        let hostname = (url.includes("://") ? url.split("://")[1] : url).split("/")[0];
      
        const options = {
          hostname: hostname,
          port: (url.includes("https://") ? 443 : 80),
          path: '/',
          method: 'GET',
          headers: {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
          }
        }

        client.get(options, (resp) => {
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
    let sanitizedTag = domTag.replace(/ /gi, "").replace(/\"/gi, "").replace(/\'/gi, "").replace(/\`/gi, "");
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
    if (sanitizedTag.includes("itemprop=image")) {
      let obj = domTag.split("content=")[1];
      let char = obj[0];
          
      let url = obj.split(char)[1];
      favicon = url;
    }
  }
  
  return favicon;
}

exports.getDescription = (dom) => {
  let desc = null;
  let metaTag = dom.split("<meta");
  for (let tag of metaTag) {
    let domTag = tag.split(">")[0];
    let sanitizedTag = domTag.replace(/ /gi, "").replace(/\"/gi, "").replace(/\'/gi, "").replace(/\`/gi, "");
    if (sanitizedTag.includes("name=description")) {
      let obj = domTag.split("content=")[1];
      let char = obj[0];
          
      let url = obj.split(char)[1];
      desc = url;
    }
  }
  
  return desc;
}

exports.getData = async (url) => {
  return new Promise(async (resolve, reject) => {
    
    let dom = await this.getContent(url);
    let favicon = this.getFavicon(dom);
    let description = this.getDescription(dom);
    
    if (!url.includes("://")) {
      url = "https://" + url;
    }
    
    if (favicon != null && !favicon.includes("://")) {
      if (!favicon.includes(url.split("://")[1])) {
        favicon = url + favicon;
      } else {
        favicon = url.split("://")[0] + "://" + url + (favicon.startsWith("/") ? favicon : "/" + favicon);
      }
    }
    
    resolve({favicon, description})
    
  });
}