let container:HTMLElement = document.querySelector(".sketch-container");
let containerWidth = window.innerWidth / 1.5;
let containerHeight = window.innerHeight / 1.5;
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

const gridSize = 50;
let cellWidth = container.clientWidth / gridSize;
let cellHeight = container.clientHeight / gridSize;
container.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`
container.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`


for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        let gridSquare:HTMLElement = document.createElement('div')
        let c1 = i / gridSize * 255;
        let c2 = j / gridSize * 255;
        let c3 = 255 - c1
        gridSquare.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`
        container.appendChild(gridSquare);
    }
}
