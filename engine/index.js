const dbhandler = require("./dbhandler");
const cached_results = new Map();

exports.search = (str) => {
  while (str.includes("  ")) {
    str = str.replace("  ", " ");
  }
  
  str = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  
  let cached = cached_results.get(str) 
  
  if (cached == null) {
    let result = dbhandler.search(str);
    cached_results.set(str, result);
    return result;
  } else {
    return cached;
  }
}