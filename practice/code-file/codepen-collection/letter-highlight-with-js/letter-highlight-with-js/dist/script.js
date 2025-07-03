const container = document.querySelector(".container");
container.textContent = randomText(8000);
const textArray = container.textContent.split("");

function randomText(length) {
	const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
	let result = "";
	for (let i = 0; i < length; i++) {
		result += alphabetArray[Math.floor(Math.random() * alphabetArray.length)];
	}
	console.log(result);
	return result;
}
function filtering(letter) {
	const textArray = Array.from(container.innerText);
	const color = getRandomColor();

	const filteredIndices = textArray
		.map((char, index) => (char === letter ? index : null))
		.filter((index) => index !== null);

	const colorfulHTML = textArray
		.map((char, index) =>
			filteredIndices.includes(index)
				? `<span class="colorful-letter" style="color: ${color};">${char}</span>`
				: `<span class="colorful-letter">${char}</span>`
		)
		.join("");

	container.innerHTML = colorfulHTML;
}

function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}