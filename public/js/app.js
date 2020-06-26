function search() {
  let query = document.getElementById("search-input").value;
  window.location.href = "/search/" + query;
}

function appendResult (title, description, link) {
  const dom = document.getElementById("results");
  dom.innerHTML = dom.innerHTML + `
    <div class="result">
      <span href="${link}" class="result-title" href="${link}">${title}</h2>
      <a class="result-url" href="${link}">${link}</a>
      <p class="result-description">${description}</p>
    </div>
`;
}
      
function initSearch (search_query) {
  var callback = (response) => {
    response = JSON.parse(response);
    for (let result of response) {
      appendResult(result.title, result.description, result.link)
    }
  };
      
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      callback(this.responseText);
    }
  }
      
  http.open("GET", "/api/search/" + search_query);
  http.send();
}