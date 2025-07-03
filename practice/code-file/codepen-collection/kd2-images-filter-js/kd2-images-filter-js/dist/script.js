function filterNow(tidyWan, tidyTwo) {
	imagesHere = Array.from(document.querySelectorAll(".screenTidy > img"));
	for (let i = 0; i < imagesHere.length; i++) {
		imagesHere[i].style.display = "none";
	}
	imagesHere = imagesHere.filter(
		(imageHere) => imageHere.getAttribute(tidyWan) == tidyTwo
	);
	for (let i = 0; i < imagesHere.length; i++) {
		imagesHere[i].style.display = "block";
	}
}