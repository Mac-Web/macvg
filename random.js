const random = document.getElementById("random");

random.addEventListener("click", select);

function select() {
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("a");
  let itemsL = Array.from(items);
  let r = Math.random();
  let rw = Math.floor(r * 256);
  let selected = items[rw];
  itemsL.forEach(function (item) {
    if (item.contains(selected)) {
      let list = document.getElementById("randomList");
      item.setAttribute("name", item.innerHTML);
      item.style.paddingBottom = "12px";
      list.innerHTML = item.outerHTML;

      console.log(item);
    } else {
    }
  });
}
