const GRID_WIDTH = 400;
const GRID_MARGIN = 10;

window.addEventListener("DOMContentLoaded", (event) => {
  /**
   *
   * @param {number} count
   * @returns {void}
   */
  const generateBoxes = (count) => {
    const square = document.getElementById("squares");

    if (square) {
      square.innerHTML = "";
    }
    // optionally empty the children of square first

    // then add count x count number of .box divs into square (hint: square.appendChild())
    const boxSize = GRID_WIDTH / count - GRID_MARGIN * 2;
    for (let i = 1; i <= count * count; i++) {
      square?.appendChild(
        createBox("box", {
          height: boxSize,
          width: boxSize,
          margin: GRID_MARGIN,
        })
      );
    }
  };

  const gridSizeInputCount = document
    .getElementById("gridNum")
    ?.getAttribute("value");
  if (gridSizeInputCount) {
    generateBoxes(parseInt(gridSizeInputCount || "1"));
    document.getElementById("gridNum")?.addEventListener("change", (e) => {
      /**
       * @type {HTMLInputElement | null}
       */
      const gridNumInput = document.getElementById("gridNum");
      const newGridSize = parseInt(gridNumInput?.value || "1");
      generateBoxes(newGridSize);
      console.log(newGridSize);
    });
  }

  const gridContainer = document.getElementById("squares");
  const divBox = document.querySelectorAll(".box");
  if (gridContainer) {
    gridContainer?.addEventListener("mouseover", (e) => {
      // readme: https://javascript.info/bubbling-and-capturing
      if (e.target?.classList.contains("box")) {
        e.target.style.backgroundColor = "red";
      }
    });
    gridContainer.style.width = `${GRID_WIDTH}px`;
  }

  document.getElementById("reset")?.addEventListener("click", (e) => {
    generateBoxes(1);
    // empty the #squares div of children
    // call generate boxes with the result of a call to the prompt("how many squares") function
  });
});

/**
 * @param {string} className
 * @param {{height: number, width: number, margin: number | undefined }} dimentions
 * @returns {HTMLDivElement}
 */

function createBox(className, { width, height, margin = 0 }) {
  const item = document.createElement("div");
  item.style.width = `${width}px`;
  item.style.height = `${height}px`;
  item.style.margin = `${margin}px`;

  item.classList.add(className);

  return item;
}

function rainbowColor() {
  return Math.floor(Math.random * 12);
}
