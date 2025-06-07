const gridSize = 16;
const totalSquares = gridSize * gridSize;
const containerSize = 640; // in pixels

const gridContainer = document.querySelector("#container");
const resizeButton = document.querySelector("#resizeButton");

// Setup flex container
gridContainer.style.display = "flex";
gridContainer.style.flexWrap = "wrap";
gridContainer.style.width = containerSize + "px";
gridContainer.style.width = containerSize + "px";
gridContainer.style.border = "2px solid black";

// Calculate square size
const squareSize = containerSize / gridSize;
for (let i = 0; i < totalSquares; i++ ){
    const square = document.createElement("div");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.border = "1px solid #fff";
    square.style.boxSizing = "border-box";
    square.style.backgroundColor = "white";

    // Etch Effect
    square.addEventListener("mouseover", () => {
        square.style.backgroundColor = "black";
    })

    gridContainer.appendChild(square);
}
