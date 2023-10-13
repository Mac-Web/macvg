function search() {
  var searchTerm = document.getElementById('searchInput').value.toLowerCase();
  var list = document.getElementById('list');
  var items = list.getElementsByTagName('a');

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemText = item.innerText.toLowerCase();
    
    if (itemText.includes(searchTerm)) {
      item.style.display = 'flex'; // Show the anchor tag
    } else {
      item.style.display = 'none'; // Hide the anchor tag
    }
  }
  
}