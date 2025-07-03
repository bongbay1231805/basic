///----------------------
//code for this derived from:
//https://blog.logrocket.com/getting-started-css-custom-highlight-api/
const query = document.querySelector("#search");
const main = document.querySelector("main");

// Find all text nodes in the main element.
const treeWalker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
const allTextNodes = [];
let currentNode = treeWalker.nextNode();
while (currentNode) {
	allTextNodes.push(currentNode);
	currentNode = treeWalker.nextNode();
}
const searchHighlight = new Highlight();
CSS.highlights.set("search-result-highlight", searchHighlight);

query.addEventListener("input", () => {
	searchHighlight.clear();
	main.style.color = "#1f2020";
	const str = query.value.trim().toLowerCase();
	if (!str) {
		return;
	}

	const ranges = allTextNodes
		.map((el) => {
			return { el, text: el.textContent.toLowerCase() };
		})
		.filter(({ text }) => text.includes(str))
		.forEach(({ text, el }) => {
			// Find all instances of str in el.textContent
			const indices = [];
			let startPos = 0;
			while (startPos < text.length) {
				const index = text.indexOf(str, startPos);
				if (index === -1) break;
				indices.push(index);
				startPos = index + str.length;
			}
			main.style.color = "#1f202050";
			indices.forEach((index) => {
				const range = new Range();
				range.setStart(el, index);
				range.setEnd(el, index + str.length);
				searchHighlight.add(range);
			});
		});
});