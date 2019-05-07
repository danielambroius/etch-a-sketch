let container:HTMLElement = document.querySelector(".sketch-container");

// Basically fullscreens the container div
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
container.style.width = windowWidth + "px";
container.style.height = windowHeight + "px";

// Dummy values for now.
const gridSize = 50;
const pencilColor = "magenta";

// Calculates the size of each cell and creates css grid using repeat()
let cellWidth = container.clientWidth / gridSize;
let cellHeight = container.clientHeight / gridSize;
container.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`
container.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`


for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        let gridSquare:HTMLElement = document.createElement('div')
        gridSquare.setAttribute("class", "item")
        gridSquare.addEventListener("mouseover", (e) => {
            changeColorOfElement(e.target);
        })
        let c1 = i / gridSize * 255;
        let c2 = j / gridSize * 255;
        let c3 = 255 - c1
        gridSquare.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`
        container.appendChild(gridSquare);
    }
}



function changeColorOfElement(div:HTMLElement) {
    div.style.backgroundColor = pencilColor;
}

