const showAllButton = document.getElementById("show-all");
const hideSomeButton = document.getElementById("hide-some");
const candyGrid = document.getElementById("candy-grid");

showAllButton.addEventListener("click", function () {
	const gridItems = Array.from(candyGrid.getElementsByClassName("candy"));
	gridItems.forEach((item) => (item.style.visibility = "visible"));
	showAllButton.setAttribute("aria-pressed", true);
	hideSomeButton.setAttribute("aria-pressed", false);
});

hideSomeButton.addEventListener("click", function () {
	const gridItems = Array.from(candyGrid.getElementsByClassName("candy"));
	const filteredCandy = gridItems.filter((item) => {
		return !item.classList.contains("brown");
	});
	gridItems.forEach((item) => (item.style.visibility = "hidden"));
	filteredCandy.forEach((item) => (item.style.visibility = "visible"));
	showAllButton.setAttribute("aria-pressed", false);
	hideSomeButton.setAttribute("aria-pressed", true);
});

function createCandy(count) {
	for (let i = 0; i < count; i++) {
		const candy = document.createElement("div");
		candy.classList.add("candy");
		candy.innerHTML = "m";

		let randomNumber = Math.floor(Math.random(i) * 6);
		switch (randomNumber) {
			case 0:
				candy.classList.add("brown");
				break;
			case 1:
				candy.classList.add("orange");
				break;
			case 2:
				candy.classList.add("yellow");
				break;
			case 3:
				candy.classList.add("green");
				break;
			case 4:
				candy.classList.add("blue");
				break;
			default:
				candy.classList.add("red");
		}

		randomNumber = Math.floor(Math.random(i) * 24);
		// Modify letter weight
		if (randomNumber % 3 === 0) {
			candy.classList.add("thin");
		}
		// Modify letter opacity
		if (randomNumber % 4 === 0) {
			candy.classList.add("faded");
		}
		// Turn slightly
		if (randomNumber % 12 === 8) {
			candy.classList.add("anti-rotate");
		} else if (randomNumber % 12 === 7) {
			candy.classList.add("rotate");
		}
		// Change Font-Size
		// Turn slightly
		if (randomNumber % 6 === 0) {
			candy.classList.add("smaller-font");
		} else if (randomNumber % 6 === 1) {
			candy.classList.add("larger-font");
		}

		candyGrid.appendChild(candy);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const height = window.innerHeight / 2 / 40;
	const width = window.innerWidth / 2 / 40;
	const area = width * height;
	const numberOfCandies = Math.max(area - 20, 4);
	createCandy(area);
});
