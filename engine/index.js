let test = [
  {
    "url": "https://google.com",
    "keywords": ["google", "google search", "search engine"]
  },
  
  {
    "url": "https://facebook.com",
    "keywords": ["facebook", "social network", "social"]
  }
]

exports.search = (str) => {
  while (str.includes("  ")) {
    str = str.replace("  ", " ");
  }
  
  let results = [];
  
  let words = str.split(" ");
  
  for (let entry of test) {
    let points = 0;
    
    for (let entry_words of entry.keywords) {
      for (let word of words) {
        if (entry_words == word)
          points++;
      }
    }
    
    if (points >= words.length - 1) {
      results.push(entry);
    }
  }
  
  return results;
}