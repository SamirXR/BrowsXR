let entries = require("./database.json");

exports.search = (str) => {
  while (str.includes("  ")) {
    str = str.replace("  ", " ");
  }
  
  let temp_results = []
  
  let words = str.split(" ");
  
  for (let entry of entries) {
    let points = 0;
    
    for (let entry_word of entry.keywords) {
      if (str.includes(entry_word))
        points++;
    }

    if (points >= 1) {
      entry.points = points;
      temp_results.push(entry);
    }
  }

  if (temp_results.length >= 11) {
    let final_results = [];

    if (final_results.length == 10) {
      return orderList(final_results);
    }

    for (let entry of temp_results) {
      if (entry.points == words.length) {
        final_results.push(entry);
      }
    }
  } else {
    return orderList(temp_results);
  }  
}

function orderList (list) {
  let temp_list = [];

  for (let i = 10; i >= 1; i--) {
    for (let item of list) {
      if (item.points == i)
        temp_list.push(item);
    }
  }

  return temp_list;
}