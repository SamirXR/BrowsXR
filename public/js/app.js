function search() {
  let query = document.getElementById("search-input").value;
  window.location.href = "/search/" + query;
}