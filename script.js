const containerSize = 640; // in pixels
const gridContainer = document.querySelector("#container");
const resizeButton = document.querySelector("#resizeButton");
const clearButton = document.querySelector("#clearButton");

// Setup flex container
gridContainer.style.display = "flex";
gridContainer.style.flexWrap = "wrap";
gridContainer.style.width = containerSize + "px";
gridContainer.style.width = containerSize + "px";
gridContainer.style.border = "2px solid black";

// Generate random color
function getRandomColor() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

function applyDarkening(rgb, level) {
  const factor = 1 - level * 0.1;
  const r = Math.floor(rgb.r * factor);
  const g = Math.floor(rgb.g * factor);
  const b = Math.floor(rgb.b * factor);
  return `rgb(${r},${g},${b})`;
}

// Function to create grid
function createGrid(squaresPerSide) {
  // Clear existing squares
  gridContainer.innerHTML = "";

  // Calculate square size
  const totalSquares = squaresPerSide * squaresPerSide;
  const squareSize = containerSize / squaresPerSide;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.border = "1px solid #ddd";
    square.style.boxSizing = "border-box";
    square.style.backgroundColor = "white";

    // Add data attributes for color and darkening level
    square.dataset.darkenLevel = "0";

    // Etch Effect
    square.addEventListener("mouseover", () => {
      //   square.style.backgroundColor = getRandomColor();
      let level = parseInt(square.dataset.darkenLevel);
      if (!square.dataset.baseColor) {
        const rgb = getRandomColor();
        square.dataset.baseColor = `${rgb.r},${rgb.g},${rgb.b}`;
      }
      if(level < 10) {
        const [r,g,b] = square.dataset.baseColor.split(",").map(Number);
        level++;
        square.dataset.darkenLevel = level.toString();
        const darkenColor = applyDarkening({r, g, b}, level);
        square.style.backgroundColor = darkenColor;
      }
    });

    gridContainer.appendChild(square);
  }

  //   Button Click Handler
  resizeButton.addEventListener("click", () => {
    let input = prompt("Enter number of squares (max is 100): ", 16);
    let num = parseInt(input);
    if (isNaN(num) || num < 1 || num > 100) {
      alert("Please enter a valid number between 1 - 100");
      return;
    }
    createGrid(num);
  });
}

// Function to clear Grid
clearButton.addEventListener("click", () => {
  const squares = gridContainer.children;
  for (let square of squares) {
    square.style.backgroundColor = "white";
    square.dataset.darkenLevel = "0";
    delete square.dataset.baseColor;
  }
});

//   Initial 16*16 grid
createGrid(16);
