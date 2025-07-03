const showAllButton = document.getElementById("show-all");
const showDecafButton = document.getElementById("show-decaf");
const drinksGrid = document.getElementById("drinks-grid");
const gridItems = Array.from(drinksGrid.getElementsByClassName("grid-item"));

showAllButton.addEventListener("click", function () {
	gridItems.forEach((item) => {
		item.style.display = "none";
		item.style.opacity = "0";
	});

	gridItems.forEach((item, index) => {
		setTimeout(() => {
			item.style.display = "block";
			item.style.transition = "opacity 0.5s ease-in-out";
			item.style.opacity = "1";
		}, index * 500);
	});
});

showDecafButton.addEventListener("click", function () {
	const decafItems = gridItems.filter(
		(item, index) => item.getAttribute("data-caffeinated") === "false"
	);

	gridItems.forEach((item) => {
		item.style.display = "none";
		item.style.opacity = "0";
	});
	decafItems.forEach((item, index) => {
		setTimeout(() => {
			item.style.display = "block";
			item.style.transition = "opacity 0.5s ease-in-out";
			item.style.opacity = "1";
		}, index * 500); // Change the 500 value to adjust the delay
	});
});