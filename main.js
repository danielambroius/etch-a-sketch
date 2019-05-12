const canvasContainer = document.querySelector(".canvas-container");
const colorPickerContainer = document.querySelector(".CP-Container");
const helptext = document.querySelector(".help-text");
const resetButton = document.querySelector(".reset-button");
const goButton = document.querySelector(".go-button");
const inputField = document.querySelector(".grid-size-field");
// Variables.
var gridSize = 50;
var pencilColor = "aquamarine";
var isDrawing = false;
var colorPickerConstructed = false;
// To check if any key is currently pressed to make keyevents trigger only once
// between keypress and keydown.
var keyIsDown = false;
// Used for setting cursor color
let style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);
function styleCanvas() {
    // Calculates wiewport dimentions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Calculates the size of each cell.
    let cellWidth = windowWidth / gridSize;
    let cellHeight = windowHeight / gridSize;
    // set for canvas
    canvasContainer.style.width = windowWidth + "px";
    ;
    canvasContainer.style.height = windowHeight + "px";
    ;
    canvasContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`;
    canvasContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`;
    // set for colorpicker
    colorPickerContainer.style.width = windowWidth + "px";
    ;
    colorPickerContainer.style.height = windowHeight + "px";
    ;
    colorPickerContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`;
    colorPickerContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`;
}
function redrawGrid() {
    canvasContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridSquare = document.createElement('div');
            gridSquare.setAttribute("class", "item");
            gridSquare.addEventListener("mouseover", (e) => {
                changeElementColor(e.target);
            });
            canvasContainer.appendChild(gridSquare);
        }
    }
}
function launchColorpicker() {
    canvasContainer.style.display = "none";
    colorPickerContainer.style.display = "grid";
    if (!colorPickerConstructed) { // i.e. if allready created, just display it.
        colorPickerContainer.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const colorSquare = document.createElement('div');
                colorSquare.setAttribute("class", "color-item");
                let hue = i / gridSize * 360;
                let saturation = "100%";
                let brightness = 30 + (j / gridSize * 60) + "%";
                colorSquare.style.backgroundColor = `hsl(${hue}, ${saturation}, ${brightness})`;
                colorSquare.addEventListener('mouseover', (e) => {
                    setPencilColor(getElementColor(e.target));
                });
                colorPickerContainer.appendChild(colorSquare);
            }
        }
        colorPickerConstructed = true;
    }
}
function closeColorPicker() {
    colorPickerContainer.style.display = "none";
    canvasContainer.style.display = "grid";
}
function changeElementColor(e) {
    if (isDrawing) {
        e.style.backgroundColor = pencilColor;
    }
}
function getElementColor(e) {
    return e.style.backgroundColor;
}
function turnDrawingOn() {
    isDrawing = true;
}
function turnDrawingOff() {
    isDrawing = false;
}
function launchHelpText() {
    helptext.style.display = "inherit";
}
function setPencilColor(color) {
    // https://stackoverflow.com/a/11371599/11227739
    pencilColor = color;
    let css = `.item:hover {border: 3px dashed ${color};}`;
    style.innerHTML = '';
    style.appendChild(document.createTextNode(css));
}
// EVENTLISTENERS:
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
            case "H":
                launchHelpText();
                break;
            default:
                break;
        }
    }
    keyIsDown = true;
});
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
});
window.onresize = styleCanvas;
goButton.onclick = () => { helptext.style.display = "none"; };
resetButton.addEventListener('click', (e) => {
    var input = parseInt(inputField.value);
    if (input != NaN && input <= 100 && input >= 2) {
        helptext.style.display = "none";
        gridSize = input;
        main(); //resets the application
    }
});
// main:
function main() {
    colorPickerConstructed = false;
    styleCanvas();
    redrawGrid();
    inputField.value = gridSize;
}
main();
