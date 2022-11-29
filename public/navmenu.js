// add hovered class in selected list item
let list = document.querySelectorAll(".navigation li");
function activeLink() {
  list.forEach((item) => item.classList.remove("hover"));
  this.classList.add("hover");
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));

//MENU TOGGLER
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
