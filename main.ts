const canvasContainer:HTMLElement = document.querySelector(".canvas-container");
const colorPickerContainer:HTMLElement = document.querySelector(".CP-Container");
const helptext:HTMLElement = document.querySelector(".help-text");
const resetButton:HTMLElement = document.querySelector(".reset-button");

// Variables.
var gridSize:number = 25;
var pencilColor:string = "magenta";
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
    canvasContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridSquare:HTMLElement = document.createElement('div')
            gridSquare.setAttribute("class", "item")
            gridSquare.addEventListener("mouseover", (e) => {
                changeElementColor
            (<HTMLElement>e.target);
            })
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
                const colorSquare:HTMLElement = document.createElement('div');
                let hue = i / gridSize * 360;
                let saturation = "100%"
                let brightness =  30 + (j / gridSize * 60) + "%";
                colorSquare.style.backgroundColor = `hsl(${hue}, ${saturation}, ${brightness})`;
                colorSquare.addEventListener('mouseover', (e) => {
                    pencilColor = getElementColor(<HTMLElement>e.target);
                    })
                colorPickerContainer.appendChild(colorSquare);
            }
        }
    colorPickerConstructed = true;}
}
function closeColorPicker() {
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

function launchHelpText() {
    helptext.style.display = "inherit";
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

resetButton.addEventListener('click', (e) => {
    var field = <HTMLFormElement>document.querySelector(".grid-size-field");
    var input = parseInt(field.value);
    if (input != NaN && input <= 100 && input >= 2) {
        helptext.style.display = "none"
        if (!(input == gridSize)) {
            gridSize = input;
            main(); //resets the application
        }
    }
})


// main:
function main() {
    colorPickerConstructed = false;
    styleCanvas();
    redrawGrid();
}

main();