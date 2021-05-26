window.addEventListener("DOMContentLoaded", (event) => {
  /**
   *
   * @param {number} count
   * @returns {void}
   */
  const generateBoxes = (count) => {
    const square = document.querySelector("#squares");
    // optionally empty the children of square first

    // then add count x count number of .box divs into square (hint: square.appendChild())
    for (let i = 1; i <= count * count; i++) {
      square?.appendChild(createBox("box"));
    }
  };

  generateBoxes(5);

  document.querySelector("#squares")?.addEventListener("mouseover", (e) => {
    // readme: https://javascript.info/bubbling-and-capturing
    console.log("you ran me over!", e.target);

    // determine IF the target is a .box element
    // IF so, then set that element's background color
  });

  document.getElementById("reset")?.addEventListener("click", () => {
    // empty the #squares div of children
    // call generate boxes with the result of a call to the prompt("how many squares") function
  });
});

/**
 * @param {string} className
 * @returns {HTMLDivElement}
 */
function createBox(className) {
  // use document.createElement to create a relevant div
  const item = document.createElement("div");
  item.classList.add(className);
  return item;
}
