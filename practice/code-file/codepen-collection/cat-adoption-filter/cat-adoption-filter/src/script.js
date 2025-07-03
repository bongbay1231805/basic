addEventListener("DOMContentLoaded", (event) => {
	const mainContainer = document.getElementById("main-container");

	const showKittensBtn = document.getElementById("show-kittens");
	const showAdultsBtn = document.getElementById("show-adults");
	const showSeniorsBtn = document.getElementById("show-seniors");
	const showFemalesBtn = document.getElementById("show-females");
	const showMalesBtn = document.getElementById("show-males");
	const showAllBtn = document.getElementById("show-all");

	const catsName = Array.from(
		mainContainer.getElementsByClassName("detail-name")
	);
	const catsDescription = Array.from(
		mainContainer.getElementsByClassName("detail-other")
	);

	showAllBtn.addEventListener("click", function () {
		catsDescription.forEach((item) => {
			item.closest(".item").style.display = "block";
		});
	});

	showKittensBtn.addEventListener("click", function () {
		// kittens will be cats under 1year
		catsDescription.forEach((item) => {
			// Find the <li> that contains the age information
			const ageLi = Array.from(item.querySelectorAll("li")).find((li) =>
				li.textContent.includes("Age:")
			);
			// If found
			if (ageLi) {
				const ageText = ageLi.textContent;
				// matches 5 year | 5 years | 5y
				const isAdult = /(\d+y|years?)/i.test(ageText);
				if (isAdult) {
					// hide if older than 1 year old
					item.closest(".item").style.display = "none";
				} else {
					// show kitten if they were hidden by other filters
					item.closest(".item").style.display = "block";
				}
			}
			// End
		});
	});

	showAdultsBtn.addEventListener("click", function () {
		// adults will be cats over 1 year, but under 11 years
		catsDescription.forEach((item) => {
			// Find the <li> that contains the age information
			const ageLi = Array.from(item.querySelectorAll("li")).find((li) =>
				li.textContent.includes("Age:")
			);
			// If found
			if (ageLi) {
				const ageText = ageLi.textContent;
				// matches 5 year | 5 years | 5y
				const isAdult = /(\d+y|years?)/i.test(ageText);
				if (isAdult) {
					const match = ageText.match(/(\d+)\s*y(?:ears?)?/i);
					const age = match[1];
					// hide if it's a senior
					if (Number(age) >= 11) {
						item.closest(".item").style.display = "none";
					} else {
						// show adult if it's been hidden by other filter
						item.closest(".item").style.display = "block";
					}
				} else {
					// hide if kitten
					item.closest(".item").style.display = "none";
				}
			}
			// End
		});
	});

	showSeniorsBtn.addEventListener("click", function () {
		// seniors will be cats over 11 years
		catsDescription.forEach((item) => {
			// Find the <li> that contains the age information
			const ageLi = Array.from(item.querySelectorAll("li")).find((li) =>
				li.textContent.includes("Age:")
			);
			// If found
			if (ageLi) {
				const ageText = ageLi.textContent;
				// matches 5 year | 5 years | 5y
				const isAdult = /(\d+y|years?)/i.test(ageText);
				if (isAdult) {
					const match = ageText.match(/(\d+)\s*y(?:ears?)?/i);
					const age = match[1];
					if (Number(age) < 11) {
						// hide if adult
						item.closest(".item").style.display = "none";
					} else {
						// show senior if it's been hidden by other filter
						item.closest(".item").style.display = "block";
					}
				} else {
					// hide if kitten
					item.closest(".item").style.display = "none";
				}
			}
			// End
		});
	});

	showFemalesBtn.addEventListener("click", function () {
		// show only cats that are female
		catsDescription.forEach((item) => {
			// Find the <li> that contains the age information
			const sexLi = Array.from(item.querySelectorAll("li")).find((li) =>
				li.textContent.includes("Sex:")
			);
			// If found
			if (sexLi) {
				const sexText = sexLi.textContent;
				const sexMatch = sexText.match(/Sex:\s*(male|female)/i);
				if (sexMatch[1] == "female") {
					item.closest(".item").style.display = "block";
				} else {
					item.closest(".item").style.display = "none";
				}
			}
			// End
		});
	});

	showMalesBtn.addEventListener("click", function () {
		// show only cats that are male
		catsDescription.forEach((item) => {
			// Find the <li> that contains the age information
			const sexLi = Array.from(item.querySelectorAll("li")).find((li) =>
				li.textContent.includes("Sex:")
			);
			// If found
			if (sexLi) {
				const sexText = sexLi.textContent;
				const sexMatch = sexText.match(/Sex:\s*(male|female)/i);
				if (sexMatch[1] == "male") {
					item.closest(".item").style.display = "block";
				} else {
					item.closest(".item").style.display = "none";
				}
			}
			// End
		});
	});
});
