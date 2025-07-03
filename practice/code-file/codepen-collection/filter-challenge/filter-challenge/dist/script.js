const showAllButton = document.getElementById("show-all");
const showDecafButton = document.getElementById("show-decaf");
const showCoffee = document.getElementById("show-coffee")
const drinksGrid = document.getElementById("drinks-grid");
const gridItems = Array.from(drinksGrid.getElementsByClassName("grid-item"));

showAllButton.addEventListener("click", function () {
	gridItems.forEach((item) => (item.style.display = "block"));
	showAllButton.setAttribute("aria-pressed", true);
	showDecafButton.setAttribute("aria-pressed", false);
	showCoffee.style.display = "block";
});

showCoffee.addEventListener("click", function(){
	const coffeeItems = gridItems.filter(
	(item) => item.getAttribute("data-caffeinated") === "true"
	);
	gridItems.forEach((item) => (item.style.display = "none"));
	coffeeItems.forEach((item) => (item.style.display = "block"));
})

showDecafButton.addEventListener("click", function () {
	const decafItems = gridItems.filter(
		(item) => item.getAttribute("data-caffeinated") === "false"
	);
	gridItems.forEach((item) => (item.style.display = "none"));
	decafItems.forEach((item) => (item.style.display = "block"));
	showAllButton.setAttribute("aria-pressed", false);
	showDecafButton.setAttribute("aria-pressed", true);
});