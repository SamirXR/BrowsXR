const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('../databases/websites.json')
const db = low(adapter);

db.defaults({ urls:[], pages:[] }).write();

function addWebsite (url, wordlist) {
  let entry = getModel({url, wordlist});
  
  db.get('urls')
  .push(entry)
  .write();
}

function getModel (obj) {
  if (obj.type == null) obj.type = "Unknown";
  if (obj.nsfw == null) obj.nsfw = false;
  if (obj.isSafeShop == null) obj.isSafeShop = false;
  return obj;
}