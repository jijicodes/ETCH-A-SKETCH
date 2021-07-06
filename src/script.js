const GRID_WIDTH = 400;
const GRID_MARGIN = 2;
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

  generateBoxes(getCurrentGridSize(6));
  document.getElementById("gridNum")?.addEventListener("change", (e) => {
    generateBoxes(getCurrentGridSize(6));
  });

  const gridContainer = document.getElementById("squares");
  const divBox = document.querySelectorAll(".box");
  if (gridContainer) {
    gridContainer?.addEventListener("mouseover", (e) => {
      // readme: https://javascript.info/bubbling-and-capturing
      if (e.target?.classList.contains("box")) {
        e.target.style.backgroundColor = "pink";
      }
    });
    gridContainer.style.width = `${GRID_WIDTH}px`;
  }

  document.getElementById("rainbowBtn")?.addEventListener("click", (e) => {
    const gridContainer = document.getElementById("squares");
    const divBox = document.querySelectorAll(".box");
    if (gridContainer) {
      gridContainer?.addEventListener("mouseover", (e) => {
        // readme: https://javascript.info/bubbling-and-capturing
        if (e.target?.classList.contains("box")) {
          e.target.style.backgroundColor = rainbowColor();
        }
      });
      gridContainer.style.width = `${GRID_WIDTH}px`;
    }
  });

  document.getElementById("darkBtn")?.addEventListener("click", (e) => {
    const gridContainer = document.getElementById("squares");
    const divBox = document.querySelectorAll(".box");
    if (gridContainer) {
      gridContainer?.addEventListener("mouseover", (e) => {
        // readme: https://javascript.info/bubbling-and-capturing
        if (e.target?.classList.contains("box")) {
          e.target.style.backgroundColor = "black";
        }
      });
      gridContainer.style.width = `${GRID_WIDTH}px`;
    }
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

  document.getElementById("reset")?.addEventListener("click", (e) => {
    generateBoxes(getCurrentGridSize(5));

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
