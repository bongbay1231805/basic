// Obtener elementos del DOM
const showAllButton = document.getElementById("show-all");
const showDecafButton = document.getElementById("show-decaf");
const drinksGrid = document.getElementById("drinks-grid");
const gridItems = Array.from(drinksGrid.getElementsByClassName("grid-item"));

// Mostrar todos los elementos al hacer clic en "Show All"
showAllButton.addEventListener("click", function () {
	gridItems.forEach((item) => {
		item.style.transform = "scale(1)";
		item.style.order = "0"; // Reset the order
	});
});

// Mostrar solo elementos descafeinados al hacer clic en "Decaf Only"
showDecafButton.addEventListener("click", function () {
	// Filtrar elementos descafeinados
	const decafItems = gridItems.filter(
		(item) => item.getAttribute("data-caffeinated") === "false"
	);

	// Mover elementos descafeinados al principio
	decafItems.forEach((item) => {
		item.style.order = "-1";
		item.style.transition = "all 1s";
	});

	// Aplicar transformación de escala para ocultar elementos descafeinados
	gridItems.forEach((item) => {
		item.style.transform = "scale(1)";
		if (!decafItems.includes(item)) {
			item.style.transform = "scale(0)";
			item.style.transition = "all .5s";
		}
	});
});
