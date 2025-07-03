document.addEventListener("DOMContentLoaded", function () {
	const drinks = Array.from(document.querySelectorAll(".drink"));
	const decafButton = document.getElementById("decaf-only");
	const caffeinatedButton = document.getElementById("caffeinated-only");
	const allDrinksButton = document.getElementById("all-drinks");
	const searchBar = document.getElementById("search-bar");

	decafButton.addEventListener("click", function () {
		filterDrinks(false);
	});

	caffeinatedButton.addEventListener("click", function () {
		filterDrinks(true);
	});

	allDrinksButton.addEventListener("click", function () {
		drinks.forEach((drink) => {
			drink.style.display = "block";
			drink.classList.remove("hidden");
		});
	});

	searchBar.addEventListener("input", function () {
		const searchText = searchBar.value.toLowerCase();
		drinks.forEach((drink) => {
			const drinkName = drink.textContent.toLowerCase();
			drink.style.display = drinkName.includes(searchText) ? "block" : "none";
			if (!drinkName.includes(searchText)) {
				drink.classList.add("hidden");
			} else {
				drink.classList.remove("hidden");
			}
		});
	});

	function filterDrinks(showCaffeinated) {
		drinks.forEach((drink) => {
			if (drink.dataset.caffeine === String(showCaffeinated)) {
				drink.style.display = "block";
				drink.classList.remove("hidden");
			} else {
				drink.style.display = "none";
				drink.classList.add("hidden");
			}
		});
	}
});
