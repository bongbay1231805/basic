/* --- OPTIONAL: HIDE SIBLING ACCORDION ITEMS WHEN ONE IS ACTIVE --- */

const accordionItems = document.querySelectorAll("details");

accordionItems.forEach((accordionItem) => {
  accordionItem.addEventListener("click", (event) => {
    accordionItems.forEach((sibling) => {
      if (sibling != accordionItem) {
        sibling.removeAttribute("open");
      }
    });
  });
});

