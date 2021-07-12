/**
 * @typedef {() => string} ColorGen
 */
const GRID_WIDTH = 100;
const GRID_MARGIN = 0.5;

/**
 * @type {{boxColor: ColorGen, gridCount: number}}
 */
let state = {
  boxColor: () => "pink",
  gridCount: 5,
};

window.addEventListener("DOMContentLoaded", (event) => {
  initializeEtchSketch();

  document.getElementById("lower")?.addEventListener("click", (e) => {
    state.gridCount > 1 && (state.gridCount -= 1);
    generateBoxes(state.gridCount);
  });

  document.getElementById("larger")?.addEventListener("click", (e) => {
    state.gridCount += 1;
    generateBoxes(state.gridCount);
  });

  document.getElementById("rainbowBtn")?.addEventListener("click", (e) => {
    state.boxColor = rainbowColor;
  });

  document.getElementById("candyBtn")?.addEventListener("click", (e) => {
    state.boxColor = (() => {
      let isRed = true;
      return () => {
        isRed = isRed ? false : true;
        return isRed ? `rgb(255,255,255)` : `rgb(255,0,0)`;
      };
    })();
  });

  document.getElementById("pastelBtn")?.addEventListener("click", (e) => {
    state.boxColor = () => `hsl(${Math.random() * 360}, 95%, 85%)`;
  });

  document.getElementById("darkBtn")?.addEventListener("click", (e) => {
    state.boxColor = (() => {
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
    generateBoxes(state.gridCount);
    state.boxColor = () => "pink";

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

function initializeEtchSketch() {
  generateBoxes(state.gridCount);
  const gridContainer = document.getElementById("squares");
  if (gridContainer) {
    gridContainer?.addEventListener("mouseover", (e) => {
      /**
       * @type {HTMLElement | null}
       */
      // @ts-ignore
      const targetEl = e.target;
      if (targetEl?.classList.contains("box")) {
        targetEl.style.backgroundColor = state.boxColor();
      }
    });
    gridContainer?.addEventListener("touchmove", (e) => {
      /**
       * @type {HTMLElement | null}
       */
      // @ts-ignore
      const el = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
      if (el?.classList.contains("box")) {
        el.style.backgroundColor = state.boxColor();
      }
    });
  }

  document.getElementById("gridNum")?.addEventListener("change", (e) => {
    generateBoxes(state.gridCount);
  });
}

/**
 * @param {string} className
 * @param {{height: number, width: number, margin: number | undefined }} dimentions
 * @returns {HTMLDivElement}
 */

function createBox(className, { width, height, margin = 0 }) {
  const item = document.createElement("div");
  item.style.width = `${width}%`;
  item.style.height = `${height}%`;
  item.style.margin = `${margin}%`;

  item.classList.add(className);

  return item;
}
