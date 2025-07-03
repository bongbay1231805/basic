let users = {};
let showCards = [];
let brands = [];
let categories = [];
fetch("https://dummyjson.com/products")
	.then((res) => res.json())
	.then((data) => {
		users = {
			products: data
		};
		showCards = Array.from(users["products"]["products"]);
		brands = showCards.map((m) => m["brand"]);
		categories = showCards.map((m) => m["category"]);
		brandSection();
		categoriesSection();
		displayItems();

		cards(showCards);
	});

let $ = (s) => document.querySelector(s);
let $$ = (s) => Array.from(document.querySelectorAll(s));
let brand = $("#brand");
let category = $("#category");
let order = $("#order");
const USERS = $("#users-section");

function brandSection() {
	let obj = {};
	brands.map((e) => (obj[e] = (obj[e] || 0) + 1));
	let keys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
	for (let i = 0; i < keys.length; i++) {
		let option = document.createElement("option");
		option.value = keys[i];
		option.textContent = `${keys[i]} (${obj[keys[i]]})`;
		brand.appendChild(option);
	}
}
function categoriesSection() {
	let obj = {};
	categories.map((e) => (obj[e] = (obj[e] || 0) + 1));
	let keys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
	for (let i = 0; i < keys.length; i++) {
		let option = document.createElement("option");
		option.value = keys[i];
		option.textContent = `${keys[i]} (${obj[keys[i]]})`;
		category.appendChild(option);
	}
}

function cards(showCards) {
	let div = document.createElement("div");
	let span = document.createElement("span");
	showCards.forEach((f, i) => {
		let flipCard = document.createElement("div");
		let flipCardInner = document.createElement("div");
		let flipCardFront = document.createElement("div");
		let img = document.createElement("div");
		let info = document.createElement("div");
		let firstRow = document.createElement("div");

		let flipCardBack = document.createElement("div");
		let imgBack = document.createElement("div");
		let infoBack = document.createElement("div");
		let secRow = document.createElement("div");

		let title = document.createElement("span");
		let rating = document.createElement("span");
		let discount = document.createElement("span");
		let price = document.createElement("span");
		let desc = document.createElement("span");

		flipCard.className = "flip-card";
		flipCardInner.className = "flip-card-inner";
		flipCardFront.className = "flip-card-front";
		img.className = "img";
		img.style.backgroundImage = f["thumbnail"];
		info.className = "info flex-center";
		firstRow.className = "first-row";
		title.className = "title";
		rating.className = "rating";
		discount.className = "discount";
		price.className = "price";
		desc.className = "desc";
		flipCardBack.className = "flip-card-back";
		imgBack.className = "img-back";
		infoBack.className = "info-back flex-center";
		secRow.className = "sec-row";
		desc.className = "desc";

		desc.textContent = f["description"].slice(0, 50) + "...";
		imgBack.style.backgroundImage = `url(${f["images"][0]})`;
		price.textContent = `Price: ${f["price"]} $`;
		discount.textContent = `Discount: ${f["discountPercentage"]} %`;
		img.style.backgroundImage = `url(${f["thumbnail"]})`;
		rating.textContent = `Rating: ${f["rating"]} / 5`;
		title.textContent = `${f["title"].slice(0, 15)}...`;

		firstRow.appendChild(title);
		firstRow.appendChild(discount);
		firstRow.appendChild(rating);
		firstRow.appendChild(price);
		info.appendChild(firstRow);
		flipCardFront.appendChild(img);
		flipCardFront.appendChild(info);
		flipCardInner.appendChild(flipCardFront);

		secRow.appendChild(desc);
		infoBack.appendChild(secRow);
		flipCardBack.appendChild(imgBack);
		flipCardBack.appendChild(infoBack);
		flipCardInner.appendChild(flipCardBack);

		flipCard.appendChild(flipCardInner);
		USERS.appendChild(flipCard);
	});
}
function clearCards() {
	let div = $$(".flip-card");
	div.forEach((m) => USERS.removeChild(m));
}

function displayItems() {
	let brandVal = "all";
	let categoryVal = "all";
	let orderVal = "all";
	brand.addEventListener("change", (e) => {
		clearCards();
		let val = e.target.value;
		if (val === "all") {
			cards(showCards);
		}
		brandVal = showCards.filter((f) => {
			return f["brand"] === val;
		});
		cards(brandVal);
	});
	category.addEventListener("change", (e) => {
		clearCards();
		let val = e.target.value;
		if (val === "all") {
			cards(showCards);
		}
		categoryVal = showCards.filter((f) => f["category"] === val);
		cards(categoryVal);
	});
	order.addEventListener("change", (e) => {
		clearCards();
		let val = e.target.value;
		if (val === "low-price") {
			showCards.sort((a, b) => a["price"] - b["price"]);
			cards(showCards);
		} else if (val === "high-price") {
			showCards.sort((a, b) => b["price"] - a["price"]);
			cards(showCards);
		} else if (val === "low-rating") {
			showCards.sort((a, b) => a["rating"] - b["rating"]);
			cards(showCards);
		} else {
			showCards.sort((a, b) => b["rating"] - a["rating"]);
			cards(showCards);
		}
	});
}