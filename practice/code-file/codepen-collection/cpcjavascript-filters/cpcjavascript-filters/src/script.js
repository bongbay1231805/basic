const products = [
	{
		name: "Apple Watch",
		imgUrl:
			"https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "eletronics"
	},
	{
		name: "Headphone",
		imgUrl:
			"https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "eletronics"
	},
	{
		name: "Polaroid Camera",
		imgUrl:
			"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "eletronics"
	},
	{
		name: "Rayban Sunglasses",
		imgUrl:
			"https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "accessories"
	},
	{
		name: "Shoes",
		imgUrl:
			"https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "shoes"
	},
	{
		name: "Plant",
		imgUrl:
			"https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "gifts"
	},
	{
		name: "Toy Car",
		imgUrl:
			"https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "gifts"
	},
	{
		name: "Digital Camera",
		imgUrl:
			"https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "eletronics"
	},
	{
		name: "Sunglasses",
		imgUrl:
			"https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "accessories"
	},
	{
		name: "High Heel",
		imgUrl:
			"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "shoes"
	},
	{
		name: "Apple Watch",
		imgUrl:
			"https://images.unsplash.com/photo-1555487505-8603a1a69755?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "eletronics"
	},
	{
		name: "Toy Car",
		imgUrl:
			"https://images.unsplash.com/photo-1572635196184-84e35138cf62?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "gifts"
	}
];
const gridContainer = document.querySelector(".grid-container");
const buttons = document.querySelector(".button-group");

document.addEventListener("DOMContentLoaded", function () {
	products.forEach((item) => {
		const gridItem = document.createElement("div");
		gridItem.classList.add("grid-item");
		gridItem.dataset.category = item.category;
		gridItem.innerHTML = `<img src=${item.imgUrl}' alt="Photo on Unsplash">
		<p>${item.name}</p>`;
		gridContainer.appendChild(gridItem);
	});
});

buttons.addEventListener("click", function (e) {
	if (!e.target.matches(".button")) return;

	const category = e.target.dataset.filter;
	const gridItems = Array.from(gridContainer.querySelectorAll(".grid-item"));

	const filteredItems = gridItems.filter((item) => {
		return item.dataset.category === category || category === "all";
	});

	gridItems.forEach((item) => {
		item.classList.remove("selected");
	});
	filteredItems.forEach((item) => {
		item.classList.add("selected");
	});

	// gridItems.forEach((item) => {
	// 	if (category === "all" || item.dataset.category === category) {
	// 		item.classList.add("selected");
	// 	} else {
	// 		item.classList.remove("selected");
	// 	}
	// });
});
