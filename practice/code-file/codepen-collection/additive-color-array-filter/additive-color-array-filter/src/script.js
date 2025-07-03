const imagesContainer = document.querySelector(".images");
const imagesItems = Array.from(imagesContainer.children);

// shuffle
const arrayShuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};

const shuffledImagesItems = arrayShuffle(imagesItems);
shuffledImagesItems.forEach((item) => imagesContainer.appendChild(item));

//filter
const toggles = document.querySelector(".toggles");
toggles.addEventListener("change", function (evt) {
  evt.preventDefault();
  let currentColor;

  imagesItems.forEach((item) => item.classList.remove("active"));

  const checkedInputs = Array.from(
    toggles.querySelectorAll(".toggles__input:checked")
  );

  const checkedRed = checkedInputs.find((input) => input.id === "red");
  const checkedGreen = checkedInputs.find((input) => input.id === "green");
  const checkedBlue = checkedInputs.find((input) => input.id === "blue");

  if (checkedInputs.length === 3) {
    imagesItems.forEach((item) => item.classList.add("active"));
  } else if (checkedInputs.length === 2) {
    if (checkedRed && checkedGreen) {
      currentColor = "yellow";
    } else if (checkedGreen && checkedBlue) {
      currentColor = "cyan";
    } else if (checkedRed && checkedBlue) {
      currentColor = "magenta";
    }
  } else if (checkedInputs.length === 1) {
    currentColor = checkedInputs[0].getAttribute("id");
  }

  let filteredImagesItems = imagesItems.filter(
    (item) => item.dataset.color === currentColor
  );

  filteredImagesItems.forEach((item) => item.classList.add("active"));
});
