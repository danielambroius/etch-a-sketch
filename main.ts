let canvasContainer:HTMLElement = document.querySelector(".canvas-container");
let colorPickerContainer:HTMLElement = document.querySelector(".CP-Container");

// Variables.
var gridSize:number = 16;
var pencilColor:string = "magenta";
var backgroundColor:string = "#e4cece"
var isDrawing:boolean = false;
var colorPickerConstructed:boolean = false;
// To check if any key is currently pressed to make keyevents trigger only once
// between keypress and keydown.
var keyIsDown:boolean = false;


function styleCanvas() {
    // Calculates wiewport dimentions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Calculates the size of each cell.
    let cellWidth = windowWidth / gridSize;
    let cellHeight = windowHeight / gridSize;

    // set for canvas
    canvasContainer.style.width = windowWidth + "px";;
    canvasContainer.style.height = windowHeight + "px";;
    canvasContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`
    canvasContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`

    // set for colorpicker
    colorPickerContainer.style.width = windowWidth + "px";;
    colorPickerContainer.style.height = windowHeight + "px";;
    colorPickerContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`
    colorPickerContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`
}

function redrawGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridSquare:HTMLElement = document.createElement('div')
            gridSquare.setAttribute("class", "item")
            gridSquare.addEventListener("mouseover", (e) => {
                changeElementColor
            (<HTMLElement>e.target);
            })
            gridSquare.style.backgroundColor = backgroundColor; 
            canvasContainer.appendChild(gridSquare);
        }
    }
}

function launchColorpicker() {
    console.log("colorpicker lauched dummy?")
    canvasContainer.style.display = "none";
    colorPickerContainer.style.display = "grid";
    if (!colorPickerConstructed) { // i.e. if allready created, just display it.
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const colorSquare:HTMLElement = document.createElement('div');
                colorSquare.setAttribute('class', 'item');
                let c1 = i / gridSize * 255;
                let c2 = j / gridSize * 255;
                let c3 = 255 - c1;
                colorSquare.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
                colorSquare.addEventListener('click', (e) => {
                    pencilColor = getElementColor(<HTMLElement>e.target);
                    console.log(pencilColor);
                })
                colorPickerContainer.appendChild(colorSquare);
            }
        }
    colorPickerConstructed = true;}
}
function closeColorPicker() {
    console.log("colorpicker closed dummy?")
    colorPickerContainer.style.display = "none";
    canvasContainer.style.display = "grid";
}


function changeElementColor(e:HTMLElement) {
    if (isDrawing) {e.style.backgroundColor = pencilColor;}
}
function getElementColor(e:HTMLElement): string {
    return e.style.backgroundColor;
}

function turnDrawingOn() {
    isDrawing = true;
}
function turnDrawingOff() {
    isDrawing = false;
}

window.addEventListener('keydown', (e) => {
    if (!keyIsDown) {
        const key = e.key.toUpperCase();
        switch (key) {
            case "X":
                turnDrawingOn();
                break;
            case "C":
                launchColorpicker();
                break;
            default:
                break;
        }
    } keyIsDown = true;
})

window.addEventListener('keyup', (e) => {
    keyIsDown = false;
    const key = e.key.toUpperCase();
    switch (key) {
        case "X":
            turnDrawingOff();
            break;
        case "C":
            closeColorPicker();
            break;
        default:
            break;
    }
})
window.onresize = styleCanvas;


// Main:
styleCanvas();
redrawGrid();