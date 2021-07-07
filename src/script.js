/**
 * @typedef {() => string} ColorGen
 */
const GRID_WIDTH = 700;
const GRID_MARGIN = 2;

/**
 * @type {ColorGen}
 */
let boxColor = () => "pink";

window.addEventListener("DOMContentLoaded", (event) => {
  initializeEtchSketch();

  document.getElementById("rainbowBtn")?.addEventListener("click", (e) => {
    boxColor = rainbowColor;
  });

  document.getElementById("darkBtn")?.addEventListener("click", (e) => {
    boxColor = (() => {
      let alpha = 0.1;
      return () => {
        alpha += (1 - alpha) / 50;
        return `rgba(0, 0, 0, ${alpha})`;
      };
    })();
  });

  /**
   * @returns {string}
   */
  function rainbowColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
  }

  document.getElementById("reset")?.addEventListener("click", (e) => {
    generateBoxes(getCurrentGridSize(5));
    boxColor = () => "pink";

    // empty the #squares div of children
    // call generate boxes with the result of a call to the prompt("how many squares") function
  });
});

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

/**
 *
 * @param {number} defaultSize
 * @returns {number}
 */
function getCurrentGridSize(defaultSize) {
  const newGridSize = parseInt(
    document.getElementById("gridNum")?.value || defaultSize
  );
  return newGridSize;
}

function initializeEtchSketch() {
  generateBoxes(getCurrentGridSize(6));
  const gridContainer = document.getElementById("squares");
  if (gridContainer) {
    gridContainer.style.width = `${GRID_WIDTH}px`;
    gridContainer?.addEventListener("mouseover", (e) => {
      if (e.target?.classList.contains("box")) {
        e.target.style.backgroundColor = boxColor();
      }
    });
    gridContainer?.addEventListener("touchmove", (e) => {
      const el = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
      if (el?.classList.contains("box")) {
        el.style.backgroundColor = boxColor();
      }
    });
  }

  document.getElementById("gridNum")?.addEventListener("change", (e) => {
    generateBoxes(getCurrentGridSize(6));
  });
}

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
